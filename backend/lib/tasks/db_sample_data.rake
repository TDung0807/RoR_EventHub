namespace :db do
    desc "Populate the database with sample data for all tables"
    task populate_all_tables: :environment do
      puts "Creating users..."
      users = 5.times.map do |i|
        User.create!(
          name: "User #{i + 1}",
          email: "user#{i + 1}@example.com",
          password_digest: "password#{i + 1}",
          username: "username#{i + 1}"
        )
      end
  
      puts "Creating vendors..."
      vendors = 5.times.map do |i|
        Vendor.create!(
          name: "Vendor #{i + 1}",
          contact: "Contact #{i + 1}",
          distance_limit: rand(10..100),
          time_limit: rand(1..10),
          service: %w[delivery transport logistics].sample
        )
      end
  
      puts "Creating transports..."
      transports = vendors.map do |vendor|
      3.times.map do |i|
        vendor.transports.create!(
        transport_type: %w[bus van car].sample,  # Renamed column for transport type
        brand: "Brand #{i + 1}",
        price: rand(50.0..200.0).round(2)
        )
      end
      end.flatten
  
      puts "Creating hotels..."
      hotels = 3.times.map do |i|
        Hotel.create!(
          name: "Hotel #{i + 1}",
          address: "Address #{i + 1}",
          rating: rand(3.0..5.0).round(1),
          star: rand(1..5),
          checkout_time: rand(10..12),
          checkin_time: rand(2..4)
        )
      end
  
      puts "Creating rooms..."
      rooms = hotels.map do |hotel|
        3.times.map do |i|
          hotel.rooms.create!(
            room_type: %w[suite deluxe standard].sample, 
            price: rand(100.0..500.0).round(2),
            capacity: rand(1..4)  
          )
        end
      end.flatten
      
  
      puts "Creating restaurants..."
      restaurants = 3.times.map do |i|
        Restaurant.create!(
          name: "Restaurant #{i + 1}",
          address: "Address #{i + 1}",
          contact: "Contact #{i + 1}",
          cuisine: %w[Italian Chinese Mexican Indian].sample
        )
      end
  
      puts "Creating dishes..."
      dishes = restaurants.map do |restaurant|
        10.times.map do |i|
          restaurant.dishes.create!(
            name: "Dish #{i + 1}",
            price: rand(10.0..50.0).round(2),
            description: "Description for Dish #{i + 1}",
            dish_type: %w[appetizer main_course dessert].sample
          )
        end
      end.flatten
  
      puts "Creating ingredients..."
      ingredients = 10.times.map do |i|
        Ingredient.create!(name: "Ingredient #{i + 1}")
      end
  
      puts "Associating dishes with ingredients..."
      dishes.each do |dish|
        dish.ingredients << ingredients.sample(rand(2..5))
      end
  
      puts "Creating groups..."
      groups = 10.times.map do |i|
        Group.create!(
          name: "Group #{i + 1}",
          status: %w[active pending completed].sample,
          participants: rand(10..50),
          description: "Description for Group #{i + 1}",
          hotel_remark: "Remark for Hotel #{i + 1}",
          transport_remark: "Remark for Transport #{i + 1}",
          dish_remark: "Remark for Dish #{i + 1}",
          hotel: hotels.sample,
          transport: transports.sample
        )
      end
  
      puts "Associating groups with dishes..."
      groups.each do |group|
        group.dishes << dishes.sample(rand(2..5))
      end
  
      puts "Creating quests..."
      quests = 5.times.map do |i|
        Quest.create!(
          name: "Quest #{i + 1}",
          email: "quest#{i + 1}@example.com",
          phone: "123456789#{i}"
        )
      end
  
      puts "Associating groups with quests..."
      groups.each do |group|
        group.quests << quests.sample(rand(1..3))
      end
  
      puts "Creating events..."
      events = users.map do |user|
        3.times.map do |i|
          user.events.create!(
            name: "Event #{i + 1}",
            date: Time.current + rand(1..30).days,
            description: "Description for Event #{i + 1}",
            duration: rand(1.0..5.0).round(1),
            address: "Address #{i + 1}",
            participants: rand(10..100),
            startAt: rand(8.0..10.0).round(1)
          )
        end
      end.flatten
  
      puts "Associating events with groups..."
      events.each do |event|
        event.groups << groups.sample(rand(1..3))
      end
  
      puts "Sample data successfully created for all tables!"
    end
  end
  