/*global describe,it,expect,$$,element,browser,by*/

var testMethod = process.env.TRAVIS ? xdescribe : describe;

testMethod('Dashboard', function () {
    'use strict';

    beforeEach(function () {
        browser.get(browser.baseUrl);

        browser.driver.wait(function () {
            return browser.driver.isElementPresent(by.css('.dashboard-content'));
        }, 5000); // wait 5s
    });

    it('should display a navigation menu linking to all entities', function () {

        $$('.nav li').then(function (items) {
            expect(items.length).toBe(5);
            expect(items[0].getText()).toBe('Posts');
            expect(items[1].getText()).toMatch(/✉\s?Comments/);
            expect(items[2].getText()).toBe('Tags');
        });
    });

    it('should display a panel for each entity with a list of recent items', function () {
        $$('.panel').then(function (panels) {
            expect(panels.length).toBe(3);

            expect(panels[0].all(by.css('.panel-heading')).first().getText()).toBe('Recent posts');
            expect(panels[1].all(by.css('.panel-heading')).first().getText()).toBe('Recent tags');
            expect(panels[2].all(by.css('.panel-heading')).first().getText()).toBe('Last comments');
        });
    });
});
