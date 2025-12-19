from playwright.sync_api import sync_playwright

def verify_parallax():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Desktop Verification
        print("Verifying Desktop Parallax...")
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto("http://localhost:8080")

        # Check if parallax-bg is fixed and has correct height
        bg = page.locator("#parallax-bg")
        position = bg.evaluate("el => getComputedStyle(el).position")
        print(f"Desktop Position: {position}") # Should be fixed

        # Scroll down and check transform
        page.evaluate("window.scrollTo(0, 500)")
        page.wait_for_timeout(500) # Wait for potential JS updates
        transform = bg.evaluate("el => el.style.transform")
        print(f"Desktop Transform at 500px scroll: {transform}") # Should be translateY(-250px)

        page.screenshot(path="verification/desktop_parallax.png")

        # 2. Mobile Verification
        print("Verifying Mobile Stretch...")
        page.set_viewport_size({"width": 375, "height": 667})
        # Reload to trigger resize logic properly (though resize event should handle it, reload is safer for initial state check)
        page.goto("http://localhost:8080")

        # Check if parallax-bg is absolute and height is 100%
        bg = page.locator("#parallax-bg")
        position = bg.evaluate("el => getComputedStyle(el).position")
        print(f"Mobile Position: {position}") # Should be absolute

        transform = bg.evaluate("el => el.style.transform")
        print(f"Mobile Transform: {transform}") # Should be 'none' or empty

        # Scroll and ensure no transform change (or rather, verify it stays 'none')
        page.evaluate("window.scrollTo(0, 500)")
        page.wait_for_timeout(500)
        transform_after = bg.evaluate("el => el.style.transform")
        print(f"Mobile Transform after scroll: {transform_after}")

        page.screenshot(path="verification/mobile_stretch.png")

        browser.close()

if __name__ == "__main__":
    verify_parallax()
