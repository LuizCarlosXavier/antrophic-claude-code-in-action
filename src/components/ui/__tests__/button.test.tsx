import { test, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";

afterEach(() => {
  cleanup();
});

test("renders with default variant and size", () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole("button", { name: "Click me" });
  expect(button).toBeTruthy();
  expect(button.className).toContain("bg-primary");
  expect(button.className).toContain("text-primary-foreground");
  expect(button.className).toContain("h-9");
  expect(button.className).toContain("px-4");
  expect(button.className).toContain("py-2");
});

test("renders with destructive variant", () => {
  render(<Button variant="destructive">Delete</Button>);
  const button = screen.getByRole("button", { name: "Delete" });
  expect(button.className).toContain("bg-destructive");
  expect(button.className).toContain("text-white");
});

test("renders with outline variant", () => {
  render(<Button variant="outline">Outline</Button>);
  const button = screen.getByRole("button", { name: "Outline" });
  expect(button.className).toContain("border");
  expect(button.className).toContain("bg-background");
});

test("renders with secondary variant", () => {
  render(<Button variant="secondary">Secondary</Button>);
  const button = screen.getByRole("button", { name: "Secondary" });
  expect(button.className).toContain("bg-secondary");
  expect(button.className).toContain("text-secondary-foreground");
});

test("renders with ghost variant", () => {
  render(<Button variant="ghost">Ghost</Button>);
  const button = screen.getByRole("button", { name: "Ghost" });
  expect(button.className).toContain("hover:bg-accent");
  expect(button.className).toContain("hover:text-accent-foreground");
});

test("renders with link variant", () => {
  render(
    <Button variant="link" asChild>
      <a href="https://example.com">Link</a>
    </Button>
  );
  const link = screen.getByRole("link", { name: "Link" });
  expect(link).toBeTruthy();
  expect(link.className).toContain("text-primary");
  expect(link.className).toContain("underline-offset-4");
});

test("renders with default size", () => {
  render(<Button>Default</Button>);
  const button = screen.getByRole("button", { name: "Default" });
  expect(button.className).toContain("h-9");
  expect(button.className).toContain("px-4");
  expect(button.className).toContain("py-2");
});

test("renders with small size", () => {
  render(
    <Button size="sm" className="custom-class">
      Small
    </Button>
  );
  const button = screen.getByRole("button", { name: "Small" });
  expect(button.className).toContain("h-8");
  expect(button.className).toContain("rounded-md");
  expect(button.className).toContain("gap-1.5");
  expect(button.className).toContain("px-3");
});

test("renders with large size", () => {
  render(<Button size="lg">Large</Button>);
  const button = screen.getByRole("button", { name: "Large" });
  expect(button.className).toContain("h-10");
  expect(button.className).toContain("rounded-md");
  expect(button.className).toContain("px-6");
});

test("renders with icon size", () => {
  render(
    <Button size="icon" aria-label="Settings">
      <svg width="16" height="16" />
    </Button>
  );
  const button = screen.getByRole("button", { name: "Settings" });
  expect(button.className).toContain("size-9");
});

test("applies custom className", () => {
  render(
    <Button className="custom-class another-class">
      Custom ClassName
    </Button>
  );
  const button = screen.getByRole("button", { name: "Custom ClassName" });
  expect(button.className).toContain("custom-class");
  expect(button.className).toContain("another-class");
});

test("renders as child element when asChild is true", () => {
  render(
    <Button asChild>
      <a href="/test">Link Button</a>
    </Button>
  );
  const link = screen.getByRole("link", { name: "Link Button" });
  expect(link).toBeTruthy();
  expect(link.tagName).toBe("A");
});

test("renders button as button element when asChild is false", () => {
  render(<Button>Regular Button</Button>);
  const button = screen.getByRole("button", { name: "Regular Button" });
  expect(button.tagName).toBe("BUTTON");
});

test("is disabled when disabled prop is true", () => {
  render(
    <Button disabled className="custom-class">
      Disabled
    </Button>
  );
  const button = screen.getByRole("button", { name: "Disabled" });
  expect(button).toHaveProperty("disabled", true);
  expect(button.className).toContain("disabled:pointer-events-none");
  expect(button.className).toContain("disabled:opacity-50");
});

test("handles click events", async () => {
  const handleClick = vi.fn();
  render(
    <Button onClick={handleClick}>Clickable</Button>
  );
  const button = screen.getByRole("button", { name: "Clickable" });
  await userEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("has correct data-slot attribute", () => {
  render(<Button>Test</Button>);
  const button = screen.getByRole("button", { name: "Test" });
  expect(button.getAttribute("data-slot")).toBe("button");
});

test("has correct focus-visible styles", () => {
  render(<Button>Focus Test</Button>);
  const button = screen.getByRole("button", { name: "Focus Test" });
  expect(button.className).toContain("focus-visible:border-ring");
  expect(button.className).toContain("focus-visible:ring-ring/50");
  expect(button.className).toContain("focus-visible:ring-[3px]");
});

test("has correct aria-invalid styles when invalid", () => {
  render(
    <Button aria-invalid="true" variant="default">
      Invalid
    </Button>
  );
  const button = screen.getByRole("button", { name: "Invalid" });
  expect(button.className).toContain("aria-invalid:ring-destructive/20");
  expect(button.className).toContain("aria-invalid:border-destructive");
});

test("has correct icon styling when icon is present", () => {
  render(
    <Button>
      <svg data-testid="test-icon" />
      Icon Button
    </Button>
  );
  const button = screen.getByRole("button", { name: "Icon Button" });
  const icon = screen.getByTestId("test-icon");
  expect(button.className).toContain("[&_svg]:pointer-events-none");
  expect(button.className).toContain("[&_svg]:shrink-0");
  expect(button.className).toContain("[&_svg:not([class*='size-'])]:size-4");
});

test("button shrinks when content is present", () => {
  render(<Button>Shrink Test</Button>);
  const button = screen.getByRole("button", { name: "Shrink Test" });
  expect(button.className).toContain("shrink-0");
});
