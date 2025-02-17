class NotifierMailer < ApplicationMailer
    def welcome_email(user, password)
      @user = user
      @password = password
      mail(to: @user.email, subject: 'Welcome to EventHub!')
    end
    def group_assignment_notification(quest)
        @quest = quest
        @groups = @quest.groups
        mail(to: @quest.email, subject: "You've been added to new groups!")
    end
  end
  