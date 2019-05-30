namespace :parse_template do
  task :start do
    pages = Dir.glob("#{Rails.root}/tmp/Admin/Light-horizontal/src/html/**/*.html")

    pages.each_with_index do |page_path, page_index|
      page_name = page_path.split('/').last.split('.').first
      parse_page = Nokogiri::HTML(open(page_path))

      # if parse_page.css('.navbar-container').size > 1
      #   puts 'Check in' + page_name
      # end
      puts "parse page #{page_name}"

      
      page_specific_head_html = ""
      
      parse_page.css('head > link:not([rel="shortcut icon"]):not([href="assets/css/bootstrap.min.css"]):not([href="assets/css/icons.min.css"]):not([href="assets/css/app.min.css"])').each do |link|
        puts "css link: #{link}"
        page_specific_head_html << "\n<%= stylesheet_link_tag '#{scropckets_link(link.attribute("href"))}', media: 'all', 'data-turbolinks-track': 'reload' %>\n"
      end
      page_specific_head_html= "<%- content_for :head_css do %>\n  #{page_specific_head_html}\n<% end %>\n"

      puts "page_specific_head_html: #{page_specific_head_html}"
      page_inner_content = parse_page.css('body > .wrapper')
      
      page_inner_content = page_inner_content.to_html
      
      addditional_scripts_on_footer = parse_page.css('body > script:not([src="assets/js/app.min.js"]):not([src="assets/js/vendor.min.js"])')
      
      addditional_scripts_on_footer_html = ""
      addditional_scripts_on_footer.each do |script|
        if script.attribute('src').blank?
          addditional_scripts_on_footer_html << '\n' + script.to_html
        else
          addditional_scripts_on_footer_html << "\n<%= javascript_include_tag '#{scropckets_link(script.attribute('src'))}', 'data-turbolinks-track': 'reload' %>"
        end
      end

      addditional_scripts_on_footer_html = "<%- content_for :footer_js do %>\n  #{addditional_scripts_on_footer_html}\n<% end %>\n"

      erb_file = File.open("#{Rails.root}/app/views/admin_pages/#{page_name.underscore}.html.erb", 'w') { |f|
        f.write(page_specific_head_html.html_safe)
        f.write(page_inner_content)
        f.write(addditional_scripts_on_footer_html)
      }
    end
  end

  def scropckets_link(str)
  puts "scropckets_link for #{str}"
    str_arr = str.to_s.split('/')        
    "admin/#{str_arr[1..str_arr.length-1].join('/')}"
  end

end
