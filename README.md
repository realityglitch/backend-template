# Manager App Backend

## Steps to run the project

1. Install the dependencies
   ```bash
   npm install
   ```
2. Create a .env file in the root of the project and add the following variables
   ```env
   PORT=3000
   DB_URI=mysql://<username>:<password>@<host>:<port>/<database>
   JWT_SECRET=<your_secret>
   ```
   Replace `your_secret` with your own secret key
3. Run the project
   ```bash
   npm run start:dev
   ```
