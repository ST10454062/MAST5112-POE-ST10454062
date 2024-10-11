 
MAST Part 2: 08/10/2024 

Student number: ST10454062 

Student name: Jolandri Cilliers 


 

CONTENTS       Christoffel’s Cafe 

 

COVER PAGE.................................................................................................................1 

CONTENTS.....................................................................................................................2 

Github link......................................................................................................................3 

Youtube link...................................................................................................................3 

Screen 1: Splashscreen................................................................................................3 

Screen 2: HomeScreen.................................................................................................6 

Screen 3: MenuScreen.................................................................................................9 

Screen 4: CartScreen..................................................................................................14 

Screen 5: ChefMenuScreen........................................................................................17 

Screen 6: AddItemScreen...........................................................................................21 

REFERENCES.............................................................................................................26 

 

Github link: 

https://github.com/ST10454062/ChristoffelsCafe.git 


Youtube link: 

https://youtu.be/icHMZJmiZIc 

 

SplashScreen: 

What the Code Does: 

View and ImageBackground: 

The entire screen is wrapped in a View with a background image set using ImageBackground. The image source is located in your assets folder and is stretched to fill the screen (flex: 1). 

Button for Navigation: 

There is a TouchableOpacity that acts as a button. When the user taps this button, it triggers the navigation.navigate('Home') function, which moves the user to the Home screen. 

The button has the text "Welcome" and is styled with custom padding, background color, and text color. 

Styling: 

The backgroundImage is positioned to allow content (the button) to be displayed at the bottom of the screen using justifyContent: 'flex-end'. 

The button is centered horizontally using marginHorizontal: 50 and moved up from the bottom using marginBottom: 100. It has a white background (#fff), rounded corners (borderRadius: 10), and bold black text (fontWeight: 'bold'). 

The button text is positioned more toward the center of the button with marginLeft: 100, giving it a bit of alignment. 

How It Will Look: 

Background Image: The app opens with a full-screen background image (from splashim.jpeg). This image will be visible throughout the screen, filling all available space. 

Centered Button: At the bottom of the screen (with some padding above), you will see a white rectangular button labeled "Welcome" in bold black text. The button is horizontally centered, and tapping it will take the user to the Home screen. 

 

Visual Layout: 

Top Portion: Dominated by the image (most of the screen height). 

Bottom Portion: A single button that stands out on the white background, asking the user to proceed by clicking "Welcome." 

 

 

HomeScreen: 

What the Code Does: 

State Management: 

The component uses useState to manage: 

menuItems: Holds the list of dishes. 

isLoading: Indicates whether the data is still being fetched from storage. 

cartItems: Tracks the items added to the cart. 

AsyncStorage: 

loadMenuItems: Fetches saved menu items from AsyncStorage when the component mounts using the useEffect hook. If there are no saved items, the list remains empty. An error message is displayed via Alert if fetching fails. 

handleAddToCart: Adds a selected item to the cart and stores it in AsyncStorage. After adding, the app navigates to the CartScreen. 

Chef's Choice Section: 

This section highlights a dish from each category (Starters, Main, Desserts). The first dish found from each category is displayed, and the average price for each category is calculated and shown. 

Navigation: 

The bottom of the screen has two buttons for navigation: 

Menu: Navigates to the MenuScreen. 

Chef: Navigates to the ChefMenu. 

How It Will Look: 

Header: 

At the top of the screen, there’s an image (e.g., the app's splash image). It is large and occupies a significant portion of the screen (200 pixels in height), with rounded corners. 

Chef’s Choice Section: 

Below the image, you have the Chef’s Choice section. 

This section contains three categories: Starters, Main, and Desserts. Each category is displayed as a card with: 

A small image (100x100 pixels) on the left. 

The name, price, and description of the featured dish. 

The average price for that category displayed below each card. 

Cards Layout: 

The category cards have a clean layout, with an image on the left, text on the right, and the overall card styled with shadows and padding for a modern look. 

Footer: 

At the bottom, two buttons for navigation are aligned horizontally: 

Menu: Takes the user to the full menu list. 

Chef: Navigates to the chef’s management screen. 

Both buttons are styled with brown backgrounds (#8B4513), white bold text, and rounded corners. 

 

 

 

 

 

Visual Layout: 

Top Section: 

Large image at the top. 

Below the image, the "Chef’s Choice" title is centered and bold. 

Middle Section (Chef's Choice Cards): 

A scrollable list containing the featured dishes from three categories. Each category card contains: 

Dish image. 

Dish name, price, and description. 

Average price for the category. 

Bottom Section (Footer): 

Two prominent buttons for navigation to the Menu and Chef pages. 

Overall User Experience: 

The HomeScreen is designed to offer a visually appealing and clean layout, starting with a welcoming image at the top and focusing on the featured dishes for the Chef's Choice section. Users can easily browse the dishes and navigate to the menu or chef's screen through the footer buttons. The addition of menu items to the cart and the average price calculation feature are practical for users interested in price comparison. 

 

 

 

MenuScreen: 

What the Code Does: 

State Management: 

The component uses useState to manage: 

selectedCategory: Tracks the currently selected category of menu items (Starters, Main, Desserts). 

searchQuery: Stores the text input from the search bar for filtering menu items. 

menuItems: Holds the list of dishes fetched from AsyncStorage. 

isPressed: Manages the pressed state for category buttons to provide visual feedback. 

isLoading: Indicates whether the menu items are still loading. 

cartItems: Tracks items added to the cart. 

itemCounts: An object to count how many of each item are in the cart. 

AsyncStorage: 

loadMenuItems: Fetches saved menu items from AsyncStorage when the component mounts using the useEffect hook. If no items are found, the list remains empty, and an error message is displayed via Alert if fetching fails. 

handleAddToCart: Adds a selected item to the cart and updates the AsyncStorage with the new cart state. After adding an item, the app navigates to the CartScreen. 

Rendering Menu Items: 

renderItem: Renders individual items from the menu. Each item displays its name, price, description, and has buttons for adding to the cart and removing items from the menu. 

Category Navigation: 

A section at the top allows users to switch between different categories (Starters, Main, Desserts). Each category is represented by a button that highlights when pressed. 

Total Courses Section: 

Displays the total number of courses available in the selected category, enhancing the user experience by providing context for the menu items. 

Navigation: 

The bottom of the screen includes a button for navigating to the CartScreen. 

How It Will Look: 

Header: 

At the top of the screen, there’s a back button for easy navigation back to the previous screen. 

Search Bar: 

Directly below the header, a search bar allows users to filter menu items by name or description, improving the accessibility of the menu. 

Category Navigation: 

Below the search bar, a row of buttons representing different categories (Starters, Main, Desserts) is displayed. The selected category button is highlighted to provide visual feedback. 

Menu Items Layout: 

The menu items are displayed in a scrollable list, with each item represented as a card that contains: 

An image of the dish. 

The name, price, and description of the dish. 

An "Add to Cart" button to facilitate quick item addition. 

A "Remove" button for the chef’s menu, allowing easy item management. 

Footer: 

At the bottom, there’s a prominent button for navigating to the CartScreen. This button is styled for visibility, ensuring users can easily find it. 

 

 

 

 

Visual Layout: 

Top Section: 

Back button at the top left for returning to the previous screen. 

Below it, the search bar is centered and prominently displayed. 

Middle Section (Menu Items): 

A scrollable list containing cards for each menu item. Each card includes: 

Dish image (e.g., 100x100 pixels). 

Dish name, price, and description. 

Buttons for adding to the cart and removing items. 

Bottom Section (Footer): 

A button for navigation to the CartScreen, ensuring users can easily access their selected items. 

Overall User Experience: 

The MenuScreen is designed to provide a user-friendly experience, enabling easy navigation between categories and straightforward item management. The inclusion of a search feature and total courses display enhances accessibility and usability. The layout is clean and organized, with a focus on visual elements that guide users through their dining options. The addition of functionality for chefs to manage menu items ensures that the app serves both customers and restaurant staff effectively. 

 

 

 

 

 

 

 

 

CartScreen: 

 

What the Code Does: 

State Management: 

The component uses useState to manage: 

items: An array that holds the current items in the cart. 

Navigation Params: 

useEffect: Fetches the cart items passed from the previous screen using navigation.getParam. It initializes the items state with the retrieved data, defaulting to an empty array if no items are found. 

Remove Item Functionality: 

handleRemoveItem: Removes a specified item from the cart. It filters the items array to exclude the item being removed, updates AsyncStorage with the new cart items, and updates the component's state. 

Total Calculation: 

calculateTotal: Computes the total price of the items in the cart using the reduce method. The result is formatted to two decimal places. 

Checkout Process: 

handleCheckout: Clears the cart and optionally removes the cart items from AsyncStorage. It displays a thank-you message using Alert, then navigates back to the Home screen. 

Rendering Cart Items: 

renderItem: Renders each item in the cart as a view containing the item’s name, price, and a "Remove" button for removing the item from the cart. 

How It Will Look: 

Header: 

At the top of the screen, there’s a title ("Your Cart") that is bold and prominently displayed. 

Cart Items List: 

Below the title, a FlatList component displays all items currently in the cart. Each item is shown as a card with: 

The item name and price. 

A "Remove" button that allows users to delete the item from the cart. 

Total Amount Display: 

Below the list of items, the total amount due for the items in the cart is displayed prominently. 

Checkout Button: 

At the bottom of the screen, a "Proceed to Checkout" button is styled for visibility and invites users to complete their purchase. 

 

 

Visual Layout: 

Top Section: 

Title centered at the top of the screen, with a larger font size for emphasis. 

Middle Section (Cart Items): 

A scrollable list of items, each displayed in a card format that includes: 

Item image (if added). 

Item name and price displayed in bold for easy readability. 

Remove button styled with a contrasting color to attract attention. 

Bottom Section (Total Amount & Checkout Button): 

The total amount due is clearly shown, with the checkout button styled prominently below it for easy access. 

Overall User Experience: 

The CartScreen provides users with a straightforward and efficient way to view and manage their selected items. The clear layout and prominent buttons enhance usability, making it easy for users to remove items and proceed to checkout. The use of AsyncStorage ensures that the cart's state is preserved, offering a smooth experience as users navigate through the app. The inclusion of an alert for confirming checkout adds a personal touch to the user interaction. Overall, the design is user-friendly and visually appealing, encouraging users to complete their purchase. 

 

 

 

 

 

 

Chef’s MenuScreen 

What the Code Does: 

State Management: 

The component uses useState to manage: 

selectedCategory: A string that holds the currently selected menu category (default is 'Main'). 

searchQuery: A string for filtering menu items based on user input in the search bar. 

menuItems: An array that stores the list of menu items retrieved from AsyncStorage. 

isPressed: A boolean that tracks the pressed state of the category buttons for visual feedback. 

Loading and Saving Menu Items: 

loadMenuItems: Fetches menu items from AsyncStorage when the component mounts and initializes the menuItems state with the retrieved data. 

saveMenuItems: Saves the current list of menu items to AsyncStorage, converting the array to a JSON string. 

Handling New Item Addition: 

useEffect: Listens for new item parameters passed via navigation. If a new item is received, it generates a unique ID, updates the menuItems state, and saves the updated list. 

Removing Menu Items: 

removeItem: A function that filters out the specified item by ID from the menuItems array, updates the state, and saves the new list back to AsyncStorage. 

Filtering Menu Items: 

filteredItems: Filters the menuItems array based on the selected category and search query, allowing users to easily find specific dishes. 

Calculating Total Courses: 

Calculates the number of items for the selected category and the total across all categories using the filter method. 

Rendering Items: 

FlatList: Renders each item in the filtered list as a view containing the item’s name, price, description, and a "Remove" button. 

How It Will Look: 

Header: 

At the top, there’s a button for adding new items and a search bar for filtering items by name or description. 

Category Navigation: 

A navigation bar with buttons for selecting different categories (Starters, Main, Desserts). The selected category is visually highlighted. 

Filtered Menu Items: 

A FlatList component displays the filtered items based on the selected category and search query. Each item is shown as a card with: 

An image (if added). 

The item name, price, and description. 

A "Remove" button to delete the item from the menu. 

Total Courses Display: 

Text elements display the total number of courses in the selected category and across all categories. 

Footer Navigation: 

A "HOME" button at the bottom allows users to navigate back to the home screen. 

 

 

 

Visual Layout: 

Top Section: 

The "Add Item" button is prominently displayed at the top, followed by the search bar, both styled for easy access. 

Middle Section (Menu Items): 

A scrollable list of items displayed in a card format, each featuring: 

Item image (if available). 

Item name and price highlighted for easy readability. 

Remove button styled in a contrasting color for visibility. 

Bottom Section (Total Courses): 

Total counts for both the selected category and all courses are clearly shown, providing users with important information at a glance. 

Overall User Experience: 

The ChefMenuScreen offers chefs a straightforward way to manage their menu items, with a clear layout that enhances usability. The search functionality and category filtering make it easy to navigate through potentially large lists of items. The use of AsyncStorage ensures that any changes to the menu persist even after the app is closed, creating a seamless experience. Visual feedback on button presses adds a responsive feel to the interface, and the ability to remove items directly from the list makes the management of the menu efficient. Overall, the design is user-friendly, encouraging chefs to maintain their menus easily. 

 

 

 

 

 

 

 

 

 

Search Feature (MenuScreen) 

 

 

 

 

AddItemScreen 

What the Code Does: 

State Management: 

The component uses useState to manage: 

name: Stores the name of the menu item. 

course: Stores the selected course/category of the menu item (Starters, Main, Desserts). 

description: Stores the description of the menu item. 

price: Stores the price of the menu item as a string. 

image: (Currently unused in the code) intended to store the URI of the item's image. 

file: (Currently unused in the code) intended to hold the selected image file. 

error: Stores any error message to be displayed if input validation fails. 

Input Validation: 

handleAddItem: This function checks if any input fields are empty or if the price is not a valid number. If validation fails, it sets an error message. If validation passes, it creates a new item object and navigates to the ChefMenu screen with the new item as a parameter. 

User Interface Elements: 

TextInput components are used for user input fields: 

Item Name: A text input for the item's name. 

Course: A dropdown (RNPickerSelect) for selecting the item's category. 

Description: A text input for a brief description of the item. 

Price: A text input for entering the price, which only accepts numeric input. 

Error Handling: 

If any validation errors occur, an error message is displayed below the input fields to inform the user of what needs to be corrected. 

Button Functionality: 

The Add Item button triggers the handleAddItem function when pressed, performing the validation and navigation logic. 

How It Will Look: 

Input Fields: 

A vertical layout where each input field is labeled clearly with bold text. The input fields have a consistent style with a light background and rounded borders. 

Dropdown for Course Selection: 

A styled dropdown that allows users to select a course category, enhancing the user experience by providing predefined options. 

Error Message: 

If an error occurs, the message is displayed in red text below the input fields to ensure it stands out for the user. 

Add Item Button: 

A prominent button at the bottom of the screen, styled with a dark background and white text, inviting users to add the item once all fields are filled correctly. 

Footer: 

A footer is included but does not contain any text or functionality in its current state. 

 

 

 

 

 

 

 

 

Visual Layout: 

Top Section: 

Displays the label "Item Name" followed by a text input for entering the item name. 

Middle Section: 

Contains labels and inputs for: 

Course selection (dropdown). 

Description (text input). 

Price (numeric input). 

Each section is spaced out for clarity, making it easy for users to navigate. 

Error Display: 

The error message appears in a red font, ensuring users can quickly identify any issues with their input. 

Bottom Section: 

The Add Item button is prominently placed at the bottom of the screen, making it easy for users to complete the process once they have filled in the required information. 

Overall User Experience: 

The AddItemScreen is designed to provide an intuitive experience for chefs adding items to the chefmenu and main menu. The clear input validation and error messaging help ensure users submit valid data, reducing frustration. The use of dropdowns and styled inputs enhances usability and aesthetics, while the prominent button encourages interaction. Overall, the design is user-friendly, guiding users through the item addition process smoothly. 

 

 

 

 

 References: 

 

Stack Overflow. (2021) Filter items based on multiple properties. Available at: https://stackoverflow.com/questions/66733479/filter-items-based-on-multiple-properties (Accessed: 10 September 2024). 

Stack Overflow. (2015) React Native TextInput max length. Available at: https://stackoverflow.com/questions/29553745/react-native-textinput-max-length#:~:text=The%20maxLength%20prop%20is%20now%20part (Accessed: 12 September 2024). 

NPM. (2024) react-native-picker-select. Available at: https://www.npmjs.com/package/react-native-picker-select (Accessed: 12 September 2024). 

Bing Images. (2019) Breakfast icon flat vector. Available at: https://www.bing.com/images/search?view=detailV2&ccid=CGNE2yrn&id=0AF8811B7AF0C69BC75EFF09D846D35467E67579 (Accessed: 13 September 2024). 

 
#   M A S T - P O E - C h r i s t o f f e l s C a f e  
 