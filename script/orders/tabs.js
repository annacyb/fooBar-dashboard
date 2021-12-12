// works only for media queries lower than 900 as it is when tabs appear

//at the begining selected tab is always li element that contains "Queue" text
let previouslySelectedTab = document
    .querySelector("ul#tabs")
    .querySelector(".selectedTab");

console.log(previouslySelectedTab);

function addTabsEventListeners() {
    const tabsWrapper = document.querySelector("ul#tabs").children;
    // change from NodeList to array
    let tabsElementsArray = [...tabsWrapper];
    console.log(tabsElementsArray);

    tabsElementsArray.forEach((tab) => {
        tab.addEventListener("click", (element) => {
            // currentTarget - target element that actually has the event listener
            if (element.currentTarget.classList.contains("selectedTab")) {
                console.log(element.currentTarget);
                console.log("YES");
            } else {
                previouslySelectedTab.classList.remove("selectedTab");
                element.currentTarget.classList.add("selectedTab");

                previouslySelectedTab = element.currentTarget;
            }
        });
    });
}

export { addTabsEventListeners };
