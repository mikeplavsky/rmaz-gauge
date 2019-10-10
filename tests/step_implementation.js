/* globals gauge*/
"use strict";
const { 
    openBrowser,
    write, 
    closeBrowser,
    goto, 
    reload,
    waitFor,
    click,
    currentURL,
    evaluate,
    $} = require('taiko');

/*const getCriTargets = require(
    '../node_modules/taiko/lib/targetHandler.js');*/

const assert = require("assert");

const headless = process.env.headless_chrome.toLowerCase() === 'true';
const host = process.env.TAIKO_HOST;
const port = process.env.TAIKO_PORT;

beforeSuite(async () => {
    await openBrowser({headless:headless,host,port})
});

afterSuite(async () => {
   //await closeBrowser();
});

step("Open On Demand", async () => {

    if (await onRecovery() || 
        await onSelectOrg() || 
        await onOnDemand()) {
        return;
    }

    await goto("https://quest-on-demand.com/");

});

async function onOnDemand() {
    let url = await currentURL();
    return url.search(
        "https://quest-on-demand.com/#/mydashboard") == 0;
}

async function onSelectOrg() {
    let url = await currentURL();
    return  url.search(
        "https://quest-on-demand.com/#/selectOrganization") == 0;
}

async function onRecovery() {
    let url = await currentURL();
    return  url.search(
        "https://quest-on-demand.com/backupandrecovery") == 0;
}

step("Sign In With Azure", async () => {

    if (await onRecovery() || 
        await onSelectOrg() || 
        await onOnDemand()) {
        return;
    }

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

    if (await onRecovery() || 
        await onOnDemand()) {return;}

    let org = "US Org";
    await waitFor(org, 120000 );

    await click( org );
    await click( "Select Organization" );

});

step("Navigate to Recovery", async () => {

    if (await onRecovery()) {return;}
    await click("Recovery");

});

step("Reload Page", async () => {
    reload();
});

step("<tab> Tab is there", async (tab) => {
    await click(tab);
});

step("Do it", async () => {
    await evaluate(() => {
    });
});

step("Get URL", async () => {
    assert.ok(await onOnDemand());
});