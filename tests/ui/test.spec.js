const { test, expect } = require('@playwright/test');

test.describe('TodoMVC - All Locator Strategies', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });

    // ============================================================
    // 1. CSS SELECTOR (Most Common)
    // ============================================================
    test('1. CSS Selector', async ({ page }) => {
        // By class
        await page.locator('.new-todo').fill('Learn CSS Selectors');
        await page.locator('.new-todo').press('Enter');

        // By ID
        await page.locator('#todo-count').waitFor();

        // By attribute
        await page.locator('[placeholder="What needs to be done?"]').fill('Second task');
        await page.locator('[placeholder="What needs to be done?"]').press('Enter');

        // By child selector
        await page.locator('.todo-list li').first().waitFor();

        await expect(page.locator('.todo-list li')).toHaveCount(2);
    });

    // ============================================================
    // 2. TEXT CONTENT
    // ============================================================
    test('2. Text Content - getByText', async ({ page }) => {
        await page.locator('.new-todo').fill('Buy groceries');
        await page.locator('.new-todo').press('Enter');

        await page.locator('.new-todo').fill('Pay bills');
        await page.locator('.new-todo').press('Enter');

        // Find by exact text
        await expect(page.getByText('Buy groceries')).toBeVisible();
        await expect(page.getByText('Pay bills', { exact: true })).toBeVisible();

        // Find by partial text
        await expect(page.getByText('groceries')).toBeVisible();

        // Check filter links
        await expect(page.getByText('All')).toBeVisible();
        await expect(page.getByText('Active')).toBeVisible();
        await expect(page.getByText('Completed')).toBeVisible();
    });

    // ============================================================
    // 3. ROLE-BASED LOCATORS (Accessibility)
    // ============================================================
    test('3. Role-based - getByRole', async ({ page }) => {
        // Locate textbox by role
        await page.getByRole('textbox').fill('Write unit tests');
        await page.getByRole('textbox').press('Enter');

        // Locate links by role
        await page.getByRole('link', { name: 'Active' }).click();
        await page.getByRole('link', { name: 'Completed' }).click();
        await page.getByRole('link', { name: 'All' }).click();

        // Locate list items
        await expect(page.getByRole('listitem')).toHaveCount(1);

        // Locate checkbox
        await page.getByRole('checkbox').check();
        await expect(page.getByRole('checkbox')).toBeChecked();
    });

    // ============================================================
    // 4. PLACEHOLDER
    // ============================================================
    test('4. Placeholder - getByPlaceholder', async ({ page }) => {
        const input = page.getByPlaceholder('What needs to be done?');

        await input.fill('Learn Playwright');
        await input.press('Enter');

        await expect(page.locator('.todo-list li')).toHaveCount(1);
    });

    // ============================================================
    // 5. LABEL (for form inputs)
    // ============================================================
    test('5. Label - getByLabel', async ({ page }) => {
        await page.locator('.new-todo').fill('Task with checkbox');
        await page.locator('.new-todo').press('Enter');

        // Get by label text (the todo text acts as label)
        const checkbox = page.getByLabel('Task with checkbox');
        await checkbox.check();

        await expect(checkbox).toBeChecked();
    });

    // ============================================================
    // 6. TEST ID (data-testid)
    // ============================================================
    test('6. Test ID - getByTestId', async ({ page }) => {
        // Note: TodoMVC doesn't have data-testid attributes
        // But here's how you would use it if it did:

        // Example (won't work on this site):
        // await page.getByTestId('todo-input').fill('Task');

        // Alternative: Use regular locator with data-testid
        // await page.locator('[data-testid="todo-input"]').fill('Task');

        // For demonstration, we'll use the actual elements
        await page.locator('.new-todo').fill('Testing locators');
        await page.locator('.new-todo').press('Enter');

        await expect(page.locator('.todo-list li')).toHaveCount(1);
    });

    // ============================================================
    // 7. XPATH
    // ============================================================
    test('7. XPath', async ({ page }) => {
        await page.locator('.new-todo').fill('XPath task');
        await page.locator('.new-todo').press('Enter');

        // XPath by class
        await expect(page.locator('xpath=//input[@class="new-todo"]')).toBeVisible();

        // XPath by text
        await expect(page.locator('xpath=//label[text()="XPath task"]')).toBeVisible();

        // XPath by attribute
        await page.locator('xpath=//input[@placeholder="What needs to be done?"]').fill('Another task');
        await page.locator('xpath=//input[@placeholder="What needs to be done?"]').press('Enter');

        await expect(page.locator('xpath=//ul[@class="todo-list"]/li')).toHaveCount(2);
    });

    // ============================================================
    // 8. NTH ELEMENT (Index-based)
    // ============================================================
    test('8. Nth Element', async ({ page }) => {
        // Add multiple todos
        await page.locator('.new-todo').fill('First todo');
        await page.locator('.new-todo').press('Enter');

        await page.locator('.new-todo').fill('Second todo');
        await page.locator('.new-todo').press('Enter');

        await page.locator('.new-todo').fill('Third todo');
        await page.locator('.new-todo').press('Enter');

        // Get first element
        await expect(page.locator('.todo-list li').first()).toContainText('First todo');

        // Get last element
        await expect(page.locator('.todo-list li').last()).toContainText('Third todo');

        // Get nth element (0-indexed)
        await expect(page.locator('.todo-list li').nth(1)).toContainText('Second todo');

        // Complete the second todo using nth
        await page.locator('.todo-list li').nth(1).locator('.toggle').check();
    });

    // ============================================================
    // 9. CHAINING LOCATORS
    // ============================================================
    test('9. Chaining Locators', async ({ page }) => {
        await page.locator('.new-todo').fill('Chained task');
        await page.locator('.new-todo').press('Enter');

        // Chain: Find todo list, then find first item, then find checkbox
        await page.locator('.todo-list')
            .locator('li')
            .first()
            .locator('.toggle')
            .check();

        // Verify it's completed
        await expect(page.locator('.todo-list li').first()).toHaveClass(/completed/);
    });

    // ============================================================
    // 10. FILTER LOCATORS
    // ============================================================
    test('10. Filter Locators', async ({ page }) => {
        await page.locator('.new-todo').fill('Active task');
        await page.locator('.new-todo').press('Enter');

        await page.locator('.new-todo').fill('Completed task');
        await page.locator('.new-todo').press('Enter');

        // Mark second task as completed
        await page.locator('.todo-list li').nth(1).locator('.toggle').check();

        // Filter: Find todos that contain specific text
        const activeTodo = page.locator('.todo-list li').filter({ hasText: 'Active task' });
        await expect(activeTodo).not.toHaveClass(/completed/);

        const completedTodo = page.locator('.todo-list li').filter({ hasText: 'Completed task' });
        await expect(completedTodo).toHaveClass(/completed/);

        // Filter by NOT having text
        const notCompleted = page.locator('.todo-list li').filter({ hasNotText: 'Completed task' });
        await expect(notCompleted).toHaveCount(1);
    });

    // ============================================================
    // 11. HAS LOCATOR (nested filtering)
    // ============================================================
    test('11. Has Locator', async ({ page }) => {
        await page.locator('.new-todo').fill('Task 1');
        await page.locator('.new-todo').press('Enter');

        await page.locator('.new-todo').fill('Task 2');
        await page.locator('.new-todo').press('Enter');

        // Mark first task as completed
        await page.locator('.todo-list li').first().locator('.toggle').check();

        // Find li that has a checked checkbox
        const completedItem = page.locator('.todo-list li').filter({
            has: page.locator('.toggle:checked')
        });

        await expect(completedItem).toHaveCount(1);
        await expect(completedItem).toContainText('Task 1');
    });

    // ============================================================
    // 12. LAYOUT LOCATORS (left-of, right-of, above, below)
    // ============================================================
    test('12. Layout Locators', async ({ page }) => {
        await page.locator('.new-todo').fill('Layout test task');
        await page.locator('.new-todo').press('Enter');

        // Find element to the left of the delete button
        const deleteButton = page.locator('.destroy').first();
        const todoText = page.locator('label').leftOf(deleteButton);

        await expect(todoText).toBeVisible();
    });

    // ============================================================
    // 13. PARENT/CHILD NAVIGATION
    // ============================================================
    test('13. Parent/Child Navigation', async ({ page }) => {
        await page.locator('.new-todo').fill('Navigation task');
        await page.locator('.new-todo').press('Enter');

        // Navigate from child to parent
        const checkbox = page.locator('.toggle').first();
        const listItem = checkbox.locator('..'); // Parent element

        await expect(listItem).toHaveClass(/todo-list-item/);
    });

    // ============================================================
    // 14. MULTIPLE LOCATOR STRATEGIES COMBINED
    // ============================================================
    test('14. Combined Strategies', async ({ page }) => {
        // Add tasks
        const todoInput = page.getByPlaceholder('What needs to be done?');

        await todoInput.fill('Buy milk');
        await todoInput.press('Enter');

        await todoInput.fill('Buy eggs');
        await todoInput.press('Enter');

        await todoInput.fill('Buy bread');
        await todoInput.press('Enter');

        // Use text + role
        await page.getByText('Buy milk').locator('..').getByRole('checkbox').check();

        // Use CSS + filter + text
        const eggsTodo = page.locator('.todo-list li')
            .filter({ hasText: 'Buy eggs' });
        await eggsTodo.getByRole('checkbox').check();

        // Verify count using text
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.locator('.todo-list li')).toHaveCount(2);

        // Clear completed
        await page.getByRole('button', { name: 'Clear completed' }).click();

        // Go back to all and verify
        await page.getByRole('link', { name: 'All' }).click();
        await expect(page.locator('.todo-list li')).toHaveCount(1);
    });

    // ============================================================
    // 15. FRAME LOCATORS (if page had iframes)
    // ============================================================
    test('15. Frame Locators - Example', async ({ page }) => {
        // Note: TodoMVC doesn't have frames, but here's how you'd use it:

        // const frame = page.frame('frame-name');
        // await frame.locator('.element').click();

        // OR
        // const frameLocator = page.frameLocator('iframe#myframe');
        // await frameLocator.locator('.element').click();

        // For demonstration with actual page:
        await page.locator('.new-todo').fill('Frame example');
        await page.locator('.new-todo').press('Enter');

        await expect(page.locator('.todo-list li')).toHaveCount(1);
    });

    // ============================================================
    // 16. VISIBLE/HIDDEN ELEMENTS
    // ============================================================
    test('16. Visible/Hidden Elements', async ({ page }) => {
        await page.locator('.new-todo').fill('Visibility test');
        await page.locator('.new-todo').press('Enter');

        // Check visibility
        await expect(page.locator('.toggle').first()).toBeVisible();

        // The destroy button is hidden until hover
        const destroyButton = page.locator('.destroy').first();

        // Hover to make it visible
        await page.locator('.todo-list li').first().hover();
        await expect(destroyButton).toBeVisible();

        // Count all elements (including hidden)
        await expect(page.locator('.destroy')).toHaveCount(1);
    });

    // ============================================================
    // 17. CONTAINS TEXT (case-insensitive)
    // ============================================================
    test('17. Contains Text', async ({ page }) => {
        await page.locator('.new-todo').fill('UPPERCASE TASK');
        await page.locator('.new-todo').press('Enter');

        // Case-insensitive search
        await expect(page.getByText('uppercase task', { exact: false })).toBeVisible();
        await expect(page.locator('text=UPPERCASE')).toBeVisible();
        await expect(page.locator('text=/uppercase/i')).toBeVisible(); // Regex
    });

    // ============================================================
    // 18. CUSTOM LOCATOR WITH OR
    // ============================================================
    test('18. OR Locator', async ({ page }) => {
        await page.locator('.new-todo').fill('First option');
        await page.locator('.new-todo').press('Enter');

        // Find element by multiple possible selectors
        const todoItem = page.locator('.todo-list li, .item, [data-todo]').first();
        await expect(todoItem).toBeVisible();
    });

});