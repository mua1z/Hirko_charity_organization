<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     *
     * @param string $token
     */
    public function __construct($token)
    {
        // Assign the provided token to the class property
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
           ->subject('Reset Password Notification')
           ->greeting('Hello ' . $notifiable->name . ',')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', url('http://localhost:5173/reset-password?token='.
            $this ->token . '&email=' . $notifiable->email))

            ->line('This password reset link will expire in 60 minutes.')
            ->line('If you did not request a password reset, no further action is required.')


            ->line('Thank you for your donation!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
