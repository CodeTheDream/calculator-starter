import { test, expect } from "@playwright/test"
test("first empty input returns error message", async ({ page }) => {
  await page.goto("/")
  //locate and click on button to submit
  await page.getByRole("button", { name: "Calculate" }).click()
  //search on page for the text: "first input needs numeric value"
  await expect(page.getByRole("button",{ name: "Calculate" })).toBeDisabled()
}) 