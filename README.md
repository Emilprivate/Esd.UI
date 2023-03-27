This UI library is a custom, lightweight vanilla JavaScript library that focuses on providing a simple set of custom UI components that can be created and added to a webpage using JavaScript. It includes classes for various types of elements, such as menus, submenus, menu items, buttons, labels, inputs, and separators. The classes are designed to be easily customizable and extensible. 

Demo with default css:
![image](demo)

### Here's a brief description of each class:

UIElement: This is the base class for all other UI elements, handling the creation of DOM elements and applying attributes and event handlers.

UIMenu: A class representing a draggable menu element. It extends UIElement and creates an unordered list ```(<ul>)``` element.

UISubmenu: A class representing a submenu that appears when the user hovers over it. It extends UIElement and creates a list item ```(<li>)``` element. It also includes a title and a nested menu.

UIMenuItem: A class representing a selectable menu item. It extends UIElement and creates a list item ```(<li>)``` element with hover, click, and selection styles.

UIButton: A class representing a button element. It extends UIElement and creates a ```<button>``` element with various mouse event styles.

UILabel: A class representing a label element. It extends UIElement and creates a ```<label>``` element.

UIInput: A class representing an input element. It extends UIElement and creates an ```<input>``` element.

### It differs from other popular UI frameworks in several ways:

**Simplicity:** The library is designed with simplicity in mind, providing a limited set of UI components that are easy to understand and use. Some popular UI frameworks like Bootstrap, Material-UI, or Ant Design offer a more comprehensive set of components, which might be more suitable for complex applications.

**Extensibility:** The library is designed to be easily extensible, with a base UIElement class that can be extended to create new UI components. Many popular frameworks are also extensible, but they may require a deeper understanding of the framework's internals or additional setup.

**Lightweight:** This library is relatively lightweight compared to more comprehensive UI frameworks. It includes only the necessary components for basic UI functionality, which can be beneficial for smaller projects or applications where performance is a priority.

**No external dependencies:** This library does not rely on external dependencies like jQuery or React, which can be found in other frameworks. This makes it easier to integrate into existing projects without adding additional overhead.

**Vanilla JavaScript:** The library is written in vanilla JavaScript, which means it does not require any specific frontend libraries or frameworks, such as React or Angular, to function. This can be a benefit for developers who want to build a simple UI without the need for additional tools or frameworks.

### Summary
In summary, this UI library is suitable for developers looking for a simple, lightweight, and extensible solution for creating basic UI components. If a more comprehensive set of components and features is required, other popular UI frameworks like Bootstrap, Material-UI, or Ant Design might be more suitable.
