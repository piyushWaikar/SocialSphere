# Clerk.com = for all authentication related works
# We use Clerk Webhook to access the user detail / to save the all use detail in local database , clerk need domain to use webhook that why we need to map our localhost:3000 over the internet so, we use ngrok :- https://dashboard.ngrok.com/get-started/setup/windows . downloaded the ngrok locally and done the process as shown in documentation. Webhook documentation :- https://clerk.com/docs/integrations/webhooks/sync-data .
# Commands :- npx prisma studio (to add data directly into MySql). To add the post and images explicitly use studio and post schema and push the images into it . only https://www.pexels.com/ are validated if you want to add the image from another website as well . Go and make changes into next.config.mjs and add url .