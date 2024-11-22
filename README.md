All changes made from part 2 to the poe

App.js 
1. Change in headerStyle Background Color 
BackgroundColor  = #7F4F24 
HomeScreen.js 
1. Styling changes 
sectionTitle: { 
fontSize: 30, 
}, 
categoryTitle: { 
marginLeft: 150, 
}, 
itemName: { 
color: '#4E3B31', 
marginLeft: 10, 
}, 
itemPrice: { 
color: '#7F4F24', 
marginBottom: 5, 
    marginLeft: 20, 
  }, 
  itemDescription: { 
    color: '#666', 
  }, 
  averagePrice: { 
    fontSize: 16, 
    marginTop: 5, 
    textAlign: 'right', 
    color: '#333', 
  }, 
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginBottom: 0, 
    backgroundColor: '#7F4F24', 
    paddingVertical: 15, 
  }, 
  navButton: { 
    backgroundColor: '#fff', 
    borderRadius: 25, 
    marginLeft: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '35%', 
  }, 
  navButtonText: { 
    fontSize: 18, 
    color: '#000000', 
    textAlign: 'center', 
  }, 
 
 
 
 
 
2. Code Changes: 
Average Price Calculation 
• The POE included a calculateAveragePrice function to calculate the average 
price for each category (Starters, Main, and Desserts). 
• The average price is displayed at the bottom of each category's section. 
// Calculate average price for each category 
const calculateAveragePrice = (category) => { 
const categoryItems = menuItems.filter((item) => item.course === category); 
if (categoryItems.length === 0) return 0; 
const total = categoryItems.reduce((sum, item) => sum + item.price, 0); 
return (total / categoryItems.length).toFixed(2); 
}; 
Homescreen                            
 Average price updates 
 
 
 
MenuScreen.js 
1. Styling changes 
   
•   backButton: { 
•     position: 'absolute', 
•     width: 80, 
•     backgroundColor: '#7F4F24', 
•     borderRadius: 25, 
•   }, 
•   backButtonText: { 
•     color: '#fff', 
•     left: 10, 
•   }, 
•   searchBar: { 
•     position: 'absolute', 
•     left: 120, 
•     borderColor: '#7F4F24', 
•     backgroundColor: '#fff', 
•   }, 
•   navbar: { 
•     justifyContent: 'space-evenly', 
•   }, 
•   totalCoursesText: { 
•     fontSize: 16, 
•     fontWeight: 'bold', 
•     color: '#4E3B31', 
•     marginLeft: 60, 
•     marginBottom: 15, 
•   }, 
•   card: { 
•     flexDirection: 'column', 
•     backgroundColor: '#ffffff', 
•     borderRadius: 15, 
•     marginBottom: 20, 
•     marginLeft: 50, 
•     marginRight: 50, 
•     elevation: 5, 
•     shadowOffset: { width: 0, height: 4 }, 
•     shadowOpacity: 0.3, 
•     shadowRadius: 8, 
•     borderColor: '#D9B88C', 
•     borderWidth: 1, 
•   }, 
•   image: { 
•     width: 100, 
•     height: 100, 
•     borderRadius: 10, 
•     marginLeft: 70, 
•     marginBottom: 15, 
•   }, 
•   itemTextContainer: { 
•     marginBottom: 15, 
•   }, 
•   itemName: { 
•     fontWeight: 'bold', 
•     color: '#4E3B31', 
•     marginLeft: 60, 
•   }, 
•   itemPrice: { 
•     fontSize: 16, 
•     color: '#7F4F24', 
•     marginLeft: 100, 
•   }, 
•   itemDescription: { 
•     fontSize: 16, 
•     color: '#6D4B3C', 
•   }, 
•   addButton: { 
•     backgroundColor: '#7F4F24', 
•     borderRadius: 25, 
•     paddingVertical: 10, 
•     paddingHorizontal: 20, 
•     width: 110, 
•     marginLeft: 70, 
•     marginBottom: 20, 
•   }, 
•   footer: { 
•     flexDirection: 'row', 
•     justifyContent: 'center', 
•     marginBottom: 0, 
•     backgroundColor: '#7F4F24', 
•     paddingVertical: 15, 
•   }, 
•   cartButton: { 
•     backgroundColor: '#fff', 
•     borderRadius: 20, 
•     paddingVertical: 10, 
•     paddingHorizontal: 20, 
•   }, 
2. Code Changes: 
Search Functionality 
• I refined the search logic in the filteredItems variable, making sure it 
checks both the selected category and the search query (case insensitive). 
The filtered data is now displayed accordingly in the FlatList. 
const filteredItems = menuItems.filter(item => 
item.course === selectedCategory && 
item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
); 
Menuscreen                            
CartScreen.js 
1. Styling changes 
  search functionality 
•   title: { 
•     fontSize: 30, 
•     margin: 10, 
•     marginTop: 20, 
•     marginLeft: 120, 
•     color: '#333', 
•   }, 
•   itemContainer: { 
•     padding: 20, 
•     margin: 30, 
•   }, 
•   itemName: { 
•     fontSize: 20, 
•   }, 
•   itemPrice: { 
•     fontSize: 17, 
•     color: '#000000', 
•   }, 
•   removeButton: { 
•     backgroundColor: '#7F4F24', 
•   }, 
•   checkoutButton: { 
•     backgroundColor: '#7F4F24', 
•   }, 
 
 
 
2. Code Changes: 
No changes made to the code 
Cartscreen                            
Thank you message after checkout 
 
 
ChefMenuScreen.js 
1. Styling changes 
  searchBar: { 
    borderColor: '#7F4F24', 
    backgroundColor: '#fff', 
  }, 
  addButton: { 
    backgroundColor: '#fff',  
    borderColor: '#7F4F24', 
  }, 
  navbar: { 
    marginTop: 70, 
    marginBottom: 15, 
  }, 
  navButton: { 
    backgroundColor: '#fff', 
  }, 
  activeButton: { 
    backgroundColor: '#7F4F24', 
  }, 
  activeText: { 
    color: '#fff', 
  }, 
  totalCoursesText: { 
    color: '#4E3B31', 
    marginLeft: 60, 
    marginBottom: 15, 
  }, 
  scrollContainer: { 
    paddingBottom: 100, // Ensure there's space at the bottom for the footer 
  }, 
  card: { 
    flexDirection: 'column',  // Stack items vertically 
    backgroundColor: '#ffffff', // Soft beige/light brown card background 
    borderRadius: 15, // Rounded corners 
    padding: 10, 
    marginBottom: 20, 
    marginLeft: 50, 
    marginRight: 50, 
    elevation: 5,  // Shadow for Android 
    shadowOpacity: 0.3,  // Shadow intensity 
    shadowRadius: 8,  // Shadow blur radius 
    borderColor: '#D9B88C',  // Light golden border 
    borderWidth: 1,  // Border width 
  }, 
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 10, 
    marginLeft: 70, 
    marginBottom: 15, 
  }, 
  itemTextContainer: { 
    marginBottom: 15, // Spacing before the button 
  }, 
  itemName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4E3B31', 
    marginLeft: 60, 
  }, 
  itemPrice: { 
    fontSize: 16, 
    color: '#7F4F24', 
    marginLeft: 100, 
  }, 
  itemDescription: { 
    fontSize: 16, 
    color: '#6D4B3C', 
  }, 
  removeButton: { 
    backgroundColor: '#7F4F24', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 25, 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 40, 
  }, 
  backButton: { 
    backgroundColor: '#fff', 
borderRadius: 20, 
paddingVertical: 10, 
paddingHorizontal: 20, 
}, 
footer: { 
flexDirection: 'row', 
justifyContent: 'center', 
marginBottom: 0, 
backgroundColor: '#7F4F24', 
paddingVertical: 15, 
}, 
2. Code Changes: 
No changes made to the code 
 
Chefmenuscreen after new styling 
 
 
 
 
 
 
 
AddItemScreen.js 
1. Styling changes 
  container: { 
    flex: 1, 
    backgroundColor: '#F1E5D7', 
  }, 
  label: { 
    margin: 10, 
    marginTop: 20, 
    marginLeft: 150, 
  }, 
  input: { 
    borderColor: '#7F4F24', 
    marginLeft: 30, 
    marginRight: 30, 
    backgroundColor: '#fff', 
  }, 
  errorText: { 
    marginLeft: 100, 
  }, 
  addButton: { 
    backgroundColor: '#7F4F24', 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    margin: 50, 
 
  }, 
  addButtonText: { 
    fontSize: 20, 
    marginLeft: 80, 
  }, 
  selector: { 
    borderColor: '#7F4F24', 
    borderRadius: 5, 
    margin: 30, 
    paddingHorizontal: 10, 
    backgroundColor: '#fff', 
}, 
footer: { 
flexDirection: 'row', 
marginBottom: 0, 
backgroundColor: '#7F4F24', 
paddingVertical: 15, 
}, 
}); 
2. Code Changes: 
KeyboardAvoidingView: 
• Added KeyboardAvoidingView to ensure that the screen layout adapts to the 
keyboard on iOS and Android. This helps improve the user experience by 
preventing the keyboard from blocking input fields. 
. 
<KeyboardAvoidingView 
style={{ flex: 1 }} 
behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
> 
</KeyboardAvoidingView> 
Additemscreen after styling 

#   M A S T - P O E - C h r i s t o f f e l s C a f e 
 
 
