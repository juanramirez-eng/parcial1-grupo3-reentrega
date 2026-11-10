import { expect, test } from "@playwright/test";

test.describe("Flujo completo de pedido", () => {
  test.beforeEach(async ({ request }) => {
    const reset = await request.post("http://localhost:3000/__test__/reset");
    expect(reset.status()).toBe(204);

    const seed = await request.post("http://localhost:3000/__test__/seed");
    expect(seed.status()).toBe(204);
  });

  test("cliente elige productos y confirma un pedido para una mesa", async ({
    page,
  }) => {
    await page.goto("/?mesa=4");

    await expect(
      page.getByRole("heading", { name: "Mesa 4" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: /nuestros productos/i }),
    ).toBeVisible();

    await page
      .getByRole("button", { name: /elegir/i })
      .first()
      .click();

    await expect(
      page.getByRole("button", { name: /confirmar pedido/i }),
    ).toBeVisible();

    await page
      .getByRole("button", { name: /confirmar pedido/i })
      .click();

    await expect(
      page.getByText(/pedido #?\d+/i),
    ).toBeVisible();

    await expect(
      page.getByText(/pendiente/i),
    ).toBeVisible();

    await expect(
      page.getByText(/total/i),
    ).toBeVisible();
  });
});