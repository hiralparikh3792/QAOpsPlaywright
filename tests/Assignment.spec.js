const {test, expect} = require ('@playwright/test');

test('Assignment page test', async ({page})=>
    {

        const EventTitle = "Hirals Third Playwright Event";
        await page.goto("https://eventhub.rahulshettyacademy.com");
        await page.locator("#email").fill("hiral37@gmail.com");
        await page.locator("#password").fill("Hanumanji@321");
        await page.locator("#login-btn").click();
        await expect(page.getByRole("link", {name: "Browse Events →"})).toBeVisible();
        await page.locator("#nav-events").click();
        await page.getByRole("button", {name: 'Add New Event'}).click();
        await expect(page.locator(".text-lg.font-bold.text-gray-900.mb-2")).toHaveText("+ New Event"); 
        await page.locator("#event-title-input").fill(EventTitle);
        await page.locator("#admin-event-form textarea").fill("This is Playwright event created by Hiral.");
        const category = await page.locator("#category");
        await category.waitFor(); // wait until the dropdown is loaded.
        await category.selectOption("Workshop");
        await page.locator("#city").fill("Ahmedabad");
        await page.locator("#venue").fill("Gujarat University Convention Center");
        await page.locator("input[type='datetime-local']").fill("2027-12-31T10:00");
        await page.locator("input[id='price-($)']").fill("100");
        await page.locator("#total-seats").fill("50");
        await page.locator("#add-event-btn").click(); 
        await expect(page.getByText("Event Created!")).toBeVisible();
        await page.locator("#nav-events").click();
        //await page.locator("#event-card").first().waitFor(); // wait until the first event card is loaded.
        const Eventcards = page.locator("h3[class*='font-semibold text']");
        await expect(Eventcards.first()).toBeVisible();
        //const Eventcardscontents = await Eventcards.allTextContents();
        //console.log(Eventcardscontents);
        const targetcard = await Eventcards.filter({hasText: EventTitle}).first(); 
        await expect(targetCard).toBeVisible({ timeout: 5000 })
        const seatsBeforeBooking = parseInt(await EventCard.getByText('seat').first().innerText());
        console.log(`Seats before booking: ${seatsBeforeBooking}`);
        await targetcard.getByTestId("book-now-btn").click();
        const ticketCount = page.locator('#ticket-count');
        await expect(ticketCount).toHaveText('1');
        await page.getByLabel('Full Name').fill('Test Student');
        await page.locator('#customer-email').fill('test.student@example.com');
        await page.getByPlaceholder('+91 98765 43210').fill('9876543210');
        await page.locator("#confirm-booking").click();
        const BookingRefId = page.locator(".booking-ref").first();
        await expect(BookingRefId).toBeVisible(); 
        
        
       
        // console.log (await filteredEventCards.locator("h3").textContent());


        










});










    
