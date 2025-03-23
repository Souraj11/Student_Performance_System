Getting Started with Create React App
This project was bootstrapped with Create React App. In addition to the React frontend, this repository includes Python scripts that require a virtual environment for dependency isolation.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser.
The page will reload when you make changes and display any lint errors in the console.

venv start (Windows Only)
Sets up and activates the Python virtual environment needed for the Python backend or scripts. Run the following commands in your project directory:

sh
Copy
Edit
python -m venv venv
venv\Scripts\activate
Once activated, install the required Python dependencies:

sh
Copy
Edit
pip install -r requirements.txt

npm test
Launches the test runner in interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes, so your app is ready to be deployed!
For more details, see the section on deployment.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project and copy all the configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) into your project for full control over them. All commands except eject will still work, but they will reference the copied scripts so you can tweak them as needed.

You don't have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature unless you need full customization.

Learn More
You can learn more in the Create React App documentation.

To dive deeper into React, check out the React documentation.

Additional Resources
Code Splitting:
https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size:
https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App:
https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration:
https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment:
https://facebook.github.io/create-react-app/docs/deployment

Troubleshooting npm run build fails to minify:
https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

