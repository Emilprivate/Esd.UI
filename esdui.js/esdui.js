class UIElement {
    constructor(parent, elementTag, attributes = {}, eventHandlers = {}) {
      this.parent = parent;
      this.element = document.createElement(elementTag);
  
      for (const [key, value] of Object.entries(attributes)) {
        this.element.setAttribute(key, value);
      }
  
      for (const [event, handler] of Object.entries(eventHandlers)) {
        this.element.addEventListener(event, handler);
      }
  
      this.parent.appendChild(this.element);
      this.style();
    }
  
    style() {}
}
  
class UIMenu extends UIElement {
    constructor(parent) {
        super(parent, 'ul');
        this.draggable();
    }

    draggable() {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (event) => {
        if (!this.element.contains(event.target) && event.target !== this.element || event.target.closest(".submenu"))
        return;
        
        isDragging = true;
        offsetX = event.clientX - this.element.getBoundingClientRect().left;
        offsetY = event.clientY - this.element.getBoundingClientRect().top;
        };
        
        const onMouseMove = (event) => {
        if (!isDragging || event.target.closest(".submenu")) 
        return;

        this.element.style.left = `${event.clientX - offsetX}px`;
        this.element.style.top = `${event.clientY - offsetY}px`;
        };
        
        const onMouseUp = (event) => {
        if (event.target.closest(".submenu")) 
        return;

        isDragging = false;
        };

        this.element.addEventListener("mousedown", onMouseDown);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (Array.from(mutation.removedNodes).includes(this.element)) {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            observer.disconnect();
            }
        });
        });

        observer.observe(this.parent, { childList: true });
    }

    style() {
        this.element.style.position = "absolute";
        this.element.style.listStyleType = "none";
        this.element.style.margin = "0";
        this.element.style.padding = "0.4em 0.4em";
        this.element.style.backgroundColor = "#f0f0f0";
        this.element.style.top = "5%";
        this.element.style.left = "2%";
        this.element.style.border = "1px solid #d0d0d0";
        this.element.style.borderRadius = "5px";
        this.element.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        this.element.style.width = "auto";
        this.element.style.height = "auto";
    }
}


class UISubmenu extends UIElement {
    constructor(parent, text, attributes = {}, eventHandlers = {}) {
        super(parent, "li", { ...attributes, class: "submenu" }, eventHandlers);
        this.submenuTitle = new UILabel(this.element, text);
        this.submenuList = new UIMenu(this.element);
        this.submenuList.element.style.display = "none";
        this.submenuList.element.style.position = "absolute";
        this.submenuList.element.style.left = "100%";
        this.submenuList.element.style.top = "0";

        this.element.addEventListener("mouseenter", () => {
        this.submenuList.element.style.display = "block";
        this.element.style.backgroundColor = "#e0e0e0";
        });
        this.element.addEventListener("mouseleave", () => {
        this.submenuList.element.style.display = "none";
        this.element.style.backgroundColor = "";
        });
    }

    style() {
        this.element.style.position = "relative";
        this.element.style.whiteSpace = "nowrap";
        this.element.style.padding = "0.10em 0.90em";
        this.element.style.cursor = "pointer";
        this.element.style.whiteSpace = "nowrap";
        this.element.style.marginLeft = "auto";
        this.element.style.marginRight = "auto";
        this.element.style.width = "auto";
        this.element.style.textAlign = "center";
    }
}

class UIMenuItem extends UIElement {
    constructor(parent, text, attributes = {}, eventHandlers = {}) {
        super(parent, "li", { ...attributes, class: "menu-item" }, eventHandlers);
        this.element.textContent = text;
        this.selected = false;

        this.element.addEventListener("mouseenter", () => {
        if (!this.selected) {
            this.element.style.backgroundColor = "#e0e0e0";
        }
        });
        this.element.addEventListener("mouseleave", () => {
        if (!this.selected) {
            this.element.style.backgroundColor = "";
        }
        });
        this.element.addEventListener("mousedown", () => {
        this.element.style.backgroundColor = "#d0d0d0";
        });
        this.element.addEventListener("mouseup", () => {
        if (!this.selected) {
            this.element.style.backgroundColor = "#e0e0e0";
        }
        });
        this.element.addEventListener("click", () => {
        this.selected = !this.selected;
        this.element.style.backgroundColor = this.selected ? "#c0c0c0" : "";
        });
    }

    style() {
        this.element.style.padding = "0.10em 0.90em";
        this.element.style.cursor = "pointer";
        this.element.style.whiteSpace = "nowrap";
        this.element.style.marginLeft = "auto";
        this.element.style.marginRight = "auto";
        this.element.style.width = "100%";
        this.element.style.textAlign = "center";
    }
}

class UIButton extends UIElement {
    constructor(parent, text, attributes = {}, eventHandlers = {}) {
        super(parent, "button", attributes, eventHandlers);
        this.element.textContent = text;

        this.element.addEventListener("mouseenter", () => {
        this.element.style.backgroundColor = "#e8e8e8";
        });
        this.element.addEventListener("mouseleave", () => {
        this.element.style.backgroundColor = "#f8f8f8";
        });
        this.element.addEventListener("mousedown", () => {
        this.element.style.backgroundColor = "#d8d8d8";
        });
        this.element.addEventListener("mouseup", () => {
        this.element.style.backgroundColor = "#e8e8e8";
        });
    }

    style() {
        this.element.style.display = "block";
        this.element.style.width = "100%";
        this.element.style.marginLeft = "auto";
        this.element.style.marginRight = "auto";
        this.element.style.padding = "0.3em";
        this.element.style.border = "1px solid #ccc";
        this.element.style.borderRadius = "4px";
        this.element.style.fontFamily = "Arial, sans-serif";
        this.element.style.fontSize = "14px";
        this.element.style.color = "#333";
        this.element.style.textAlign = "center";
        this.element.style.whiteSpace = "nowrap";
    }
}

class UILabel extends UIElement {
    constructor(parent, text, attributes = {}, eventHandlers = {}) {
        super(parent, "label", attributes, eventHandlers);
        this.element.textContent = text;
    }

    style() {
        this.element.style.fontFamily = "Arial, sans-serif";
        this.element.style.fontSize = "16px";
        this.element.style.color = "#333";
    }
}

class UIInput extends UIElement {
    constructor(parent, attributes = {}, eventHandlers = {}) {
        super(parent, "input", attributes, eventHandlers);
    }

    style() {
        this.element.style.display = "block";
        this.element.style.width = "100%";
        this.element.style.marginLeft = "auto";
        this.element.style.marginRight = "auto";
        this.element.style.padding = "0.3em 0.01em";
        this.element.style.border = "1px solid #ccc";
        this.element.style.borderRadius = "4px";
        this.element.style.fontFamily = "Arial, sans-serif";
        this.element.style.fontSize = "14px";
        this.element.style.color = "#333";
        this.element.style.textAlign = "center";
    }
}

class UISeparator extends UIElement {
    constructor(parent, attributes = {}, eventHandlers = {}) {
        super(parent, "hr", attributes, eventHandlers);
}

    style() {
        this.element.style.border = "none";
        this.element.style.borderTop = "1px solid #d0d0d0";
        this.element.style.margin = "0.2em 0";
    }
}

export default class ESDUI {
    createUIElement(type, parent, ...args) {
        switch (type) {
        case "Menu":
            return new UIMenu(parent, ...args);
        case "Submenu":
            return new UISubmenu(parent, ...args);
        case "MenuItem":
            return new UIMenuItem(parent, ...args);
        case "Button":
            return new UIButton(parent, ...args);
        case "Label":
            return new UILabel(parent, ...args);
        case "Input":
            return new UIInput(parent, ...args);
        case "Separator":
            return new UISeparator(parent, ...args);
        default:
            throw new Error(`Unknown UI element type: ${type}`);
        }
    }
}
