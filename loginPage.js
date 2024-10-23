const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function loginAutomation() {
  let options = new chrome.Options();

  options.setChromeBinaryPath(
    "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe"
  );

  // Optional: Adding arguments
  options.addArguments("--start-maximized");

  // Launching Brave browser
  let driver = await new Builder()
    .forBrowser("chrome") // Brave is Chromium-based
    .setChromeOptions(options)
    .build();

  try {
    console.log("Starting login automation...");

    // Navigating to the login page
    await driver.get("http://localhost:3002/login");
    console.log("Navigated to login page");

    // Waiting for the login form to appear and be interactive
    const emailField = await driver.wait(
      until.elementLocated(By.name("email")),
      10000
    );
    await driver.wait(until.elementIsVisible(emailField), 5000);
    console.log("Login form located");

    // Filling in the email and password
    await emailField.sendKeys("souaouti.iman@gmail.com");
    const passwordField = await driver.findElement(By.name("password"));
    await passwordField.sendKeys("12345678aB$");
    console.log("Credentials entered");

    // Clicking the login button
    const loginButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await driver.wait(until.elementIsEnabled(loginButton), 5000);
    await loginButton.click();
    console.log("Login button clicked");

    // Waiting for the login to complete and verifying
    await driver.wait(until.urlContains("/home"), 10000);
    let currentUrl = await driver.getCurrentUrl();
    console.log(`Login successful, current URL: ${currentUrl}`);
  } catch (error) {
    console.error("An error occurred during the login automation:", error);
  } finally {
    // Close the browser
    await driver.quit();
  }
}

loginAutomation();
