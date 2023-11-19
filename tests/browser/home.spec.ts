import { test } from '@japa/runner'

test.group('E2E', () => {
  test('see homepage', async ({ visit }) => {
    const page = await visit('/')
    await page.waitForSelector('.hero')
    await page.assertTextContains('body', 'Discover the best')
  })

  test('display packages', async ({ visit }) => {
    const page = await visit('/')

    await page.waitForSelector('.card')
    await page.assertElementsCount('.card', 9)
  })

  test('clicking on a card open the package page', async ({ visit }) => {
    const page = await visit('/')

    await page.waitForSelector('.card')

    const firstPackageName = page.getByTestId('package-name').first()
    const packageName = await firstPackageName.textContent()

    await firstPackageName.click()

    await page.waitForURL(`/packages/${packageName}`)
    await page.assertTextContains('body', packageName!)
  })

  test('can sort packages by stars', async ({ assert, visit }) => {
    const page = await visit('/')

    await page.waitForSelector('.card')

    const sortByButton = page.getByTestId('sort-by')

    await sortByButton.click()
    await sortByButton
      .locator('ul')
      .getByRole('option')
      .filter({ hasText: /stars/ })
      .first()
      .click()

    const allPackageStars = await page.$$('[data-testid="package-stars"]')
    const stars = await Promise.all(allPackageStars.map((el) => el.textContent()))

    const sortedStars = [...stars].sort((a, b) => Number(b) - Number(a))

    assert.deepEqual(stars, sortedStars)
    assert.deepEqual(stars.length, 9)
  })

  test('can filter packages by category', async ({ assert, visit }) => {
    const page = await visit('/')

    const categoryButton = page.getByTestId('category-button').first()
    const categoryLabel = await categoryButton.getByTestId('category-label').first().textContent()

    await categoryButton.click()

    const allPackagesCategories = await page.$$('[data-testid="package-category"]')
    const categories = await Promise.all(allPackagesCategories.map((el) => el.textContent()))

    const uniqueCategories = [...new Set(categories)]

    assert.deepEqual(uniqueCategories, [categoryLabel])
  })
})
