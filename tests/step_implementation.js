/* globals gauge*/
"use strict";
const { 
    openBrowser,
    write, 
    closeBrowser,
    goto, 
    press, 
    text, 
    focus, 
    textBox, 
    toRightOf,
    waitFor,
    click,
    $} = require('taiko');

const assert = require("assert");

const headless = process.env.headless_chrome.toLowerCase() === 'true';
const host = process.env.TAIKO_HOST;
const port = process.env.TAIKO_PORT;

beforeSuite(async () => {
    await openBrowser({headless: headless,host,port})
});

afterSuite(async () => {
    //await closeBrowser();
});

step("Open On Demand", async () => {
    await goto("https://quest-on-demand.com/");
});

step("Sign In With Azure", async () => {

    let user = process.env.ODR_USER
    let pwd = process.env.ODR_PWD

    await click("Sign In");
    await click( $("#azuread-oidc-login") );

    await write ( user );
    await click( "Next" );

    await write ( pwd );
    await click( "Sign In" );

    user = "";
    pwd = "";

    await click( "Yes" );

});

step("Select Organization", async function() {

    let org = "US Org";
    await waitFor(org, 120000 );

    await click( org );
    await click( "Select Organization" );

});

step("Navigate to Recovery", async () => {
    await click("Recovery");
    await waitFor( "Manage Backups" );
});

step("<tab> Tab is there", async (tab) => {
    await click(tab);
});