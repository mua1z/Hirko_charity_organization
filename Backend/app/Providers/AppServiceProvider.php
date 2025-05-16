<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void

    {
        VerifyEmail::toMailUsing(function (object $notifiable, $url) {

            $parts = parse_url($url);
            $verifyEmail = 'https://localhost:5173/verify-email?id='
                . $notifiable->getKey() . '&hash=' . sha1($notifiable->getEmailForVerification())
                . '&' . $parts['query'];
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('Verify Email Address')
                ->greeting('Hello ' . $notifiable->name . ',')
                ->line('Thank you for registering with us!')
                ->line('Please click the button below to verify your email address.')
                ->action('Verify Email Address', $verifyEmail)
                ->line('If you did not create an account, no further action is required.');
        });
        //
    }
}
