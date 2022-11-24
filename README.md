# Restaurant Reports WebApp


[![Netlify Status](https://api.netlify.com/api/v1/badges/53b519c3-00a4-46cd-984f-14f89dad89f9/deploy-status)](https://app.netlify.com/sites/restaurant-reports-bpvcode/deploys)

This is a working progress webapp that allow restaurant managers to manage their daily cash flow across different daily reports.

## Development Process Tracking

Check [**here**](https://airtable.com/shrXsF5MPsCPM8H63) in real time 🕵️

**Current Issue Log:**

- Setup React project
  - Setup authentication (BASIC yet) component
  - Setup daily report component
- Setup Serverless functions as backend
  - Setup Users functions
  - Setup daily report functions
- Setup database
  - Setup User table
  - Setup Daily Report table
- Setup netlify
  - Deploy dev
  - Deploy prod

**Next features to implement:**

- Ability to add calendars with shifts report
  - Admins can assign all "staff"(users - role) to a specific shift and do a week schedule view
  - Staff should only be able to view the next X schedules referent to the restaurant who is assign
- ... 🚀

## Available Scripts

In the project directory, you can run:

### `npm install`

- Install project dependencies

### `netlify dev`

**Launch full stack app:**

- REACT as frontend
- Typescript as serverless functions working as backend
- Airtable as database

Runs the app in the development mode, locally.\
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `netlify deploy`

Link your local repository with netlify and deploy all stack from local to remote

## CI / CD and Infra

- [ ] TODO - CONTINUE... (CI CD process based on netlify ; Branch strategy ; Pull request and protected branch)

### Environment variables to set

- JWT_SECRET
- AIRTABLE_API_KEY
- AIRTABLE_BASE_ID
- AIRTABLE_USER_TABLE_ID

## Backend - Serverless Functions Describe

- [ ] TODO

## Frontend - Describe react components

- [ ] TODO - Describe also state and effect workflows

## Final notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## License

[MIT](./LICENSE)

```
MIT License

Copyright (c) 2022 Bruno Vilar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">Copyright (c) 2022 Bruno Vilar</p>
