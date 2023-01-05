// testing Calculator.tsx
//end2end testing simulates a user interacting with the application
import { test, expect } from "@playwright/test"
test("first empty input returns error message", async ({ page }) => {
  await page.goto("/")
  //locate the first input field and type blank space
  await page.getByLabel("First Number").type("")
  //locate and click on button to submit
  await page.getByRole("button", { name: "Calculate" }).click()
  //search on page for the text: "first input needs numeric value"
  await expect(page.getByText("first input needs numeric value")).toBeVisible()
}) 