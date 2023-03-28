import * as styles from './styles.js';

class UIElement 
{
    constructor(parent, elementTag, attributes = {}, eventHandlers = {}) 
    {
      this.parent = parent;
      this.element = document.createElement(elementTag);
  
      for (const [key, value] of Object.entries(attributes)) 
      {
        this.element.setAttribute(key, value);
      }
  
      for (const [event, handler] of Object.entries(eventHandlers)) 
      {
        this.element.addEventListener(event, handler.bind(this));
      }
  
      this.parent.appendChild(this.element);
      this.style();
    }
  
    style() 
    {
      styles.commonStyles(this.element);
    }
  }
  
class UIMenu extends UIElement 
{
    constructor(parent) 
    {
        super(parent, 'ul');
        this.draggable();
    }

    draggable() 
    {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const onMouseDown = (event) => 
        {
        if (!this.element.contains(event.target) && 
            event.target !== this.element || 
            event.target.closest(".submenu"))
            return;
        
            isDragging = true;
            offsetX = event.clientX - this.element.getBoundingClientRect().left;
            offsetY = event.clientY - this.element.getBoundingClientRect().top;
        };
        
        const onMouseMove = (event) => 
        {
            if (!isDragging || 
                event.target.closest(".submenu")) 
                return;

            this.element.style.left = `${event.clientX - offsetX}px`;
            this.element.style.top = `${event.clientY - offsetY}px`;
        };
        
        const onMouseUp = (event) => 
        {
            if (event.target.closest(".submenu")) 
                return;

            isDragging = false;
        };

        this.element.addEventListener("mousedown", onMouseDown);

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);

        const observer = new MutationObserver((mutations) => 
        {
        mutations.forEach((mutation) => {
                if (Array.from(mutation.removedNodes).includes(this.element)) 
                {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                    observer.disconnect();
                }
            });
        });

        observer.observe(this.parent, { childList: true });
    }

    style() 
    {
        super.style();
        styles.menuStyles(this.element);
    }
}


class UISubmenu extends UIElement 
{
    constructor(parent, text, attributes = {}, eventHandlers = {}) 
    {
        super(parent, "li", { ...attributes, class: "submenu" }, eventHandlers);
        this.submenuTitle = new UILabel(this.element, text);
        this.submenuList = new UIMenu(this.element);
        this.submenuList.element.style.display = "none";
        this.submenuList.element.style.position = "absolute";
        this.submenuList.element.style.left = "100%";
        this.submenuList.element.style.top = "0";

        this.element.addEventListener("mouseenter", () => 
        {
            this.submenuList.element.style.display = "block";
            this.element.style.backgroundColor = "#e0e0e0";
        });

        this.element.addEventListener("mouseleave", () => 
        {
            this.submenuList.element.style.display = "none";
            this.element.style.backgroundColor = "";
        });
    }

    style() 
    {
        super.style();
        styles.submenuStyles(this.element);
    }
}

class UIMenuItem extends UIElement 
{
    constructor(parent, text, attributes = {}, eventHandlers = {}) 
    {
        super(parent, "li", { ...attributes, class: "menu-item" }, eventHandlers);
        this.element.textContent = text;
        this.selected = false;

        this.element.addEventListener("mouseenter", () => 
        {
            if (!this.selected) {
                this.element.style.backgroundColor = "#e0e0e0";
            }
        });

        this.element.addEventListener("mouseleave", () => 
        {
            if (!this.selected) 
            {
                this.element.style.backgroundColor = "";
            }
        });
        
        this.element.addEventListener("mousedown", () => 
        {
            this.element.style.backgroundColor = "#d0d0d0";
        });

        this.element.addEventListener("mouseup", () => 
        {
            if (!this.selected) 
            {
                this.element.style.backgroundColor = "#e0e0e0";
            }
        });

        this.element.addEventListener("click", () => 
        {
            this.selected = !this.selected;
            this.element.style.backgroundColor = this.selected ? "#c0c0c0" : "";
        });
    }

    style() 
    {
        super.style();
        styles.menuItemStyles(this.element);
    }
}

class UIButton extends UIElement 
{
    constructor(parent, text, attributes = {}, eventHandlers = {}) 
    {
        super(parent, "button", attributes, eventHandlers);
        this.element.textContent = text;

        this.element.addEventListener("mouseenter", () => 
        {
            this.element.style.backgroundColor = "#e8e8e8";
        });

        this.element.addEventListener("mouseleave", () => 
        {
            this.element.style.backgroundColor = "#f8f8f8";
        });

        this.element.addEventListener("mousedown", () => 
        {
            this.element.style.backgroundColor = "#d8d8d8";
        });

        this.element.addEventListener("mouseup", () => 
        {
            this.element.style.backgroundColor = "#e8e8e8";
        });
    }

    style() 
    {
        super.style();
        styles.buttonStyles(this.element);
    }
}

class UILabel extends UIElement 
{
    constructor(parent, text, attributes = {}, eventHandlers = {}) 
    {
        super(parent, "label", attributes, eventHandlers);
        this.element.textContent = text;
    }

    style() 
    {
        super.style();
        styles.labelStyles(this.element);
    }
}

class UIInput extends UIElement 
{
    constructor(parent, attributes = {}, eventHandlers = {}) 
    {
        super(parent, "input", attributes, eventHandlers);
    }

    style() 
    {
        super.style();
        styles.inputStyles(this.element);
    }
}

class UISeparator extends UIElement 
{
    constructor(parent, attributes = {}, eventHandlers = {}) 
    {
        super(parent, "hr", attributes, eventHandlers);
    }

    style() 
    {
        super.style();
        styles.separatorStyles(this.element);
    }
}

export default class ESDUI 
{
    createUIElement(type, parent, ...args) 
    {
      const config = args[0] || {};
      const attributes = config.attributes || {};
      const eventHandlers = config.eventHandlers || {};
  
      switch (type) 
      {
        case 'Menu':
          return new UIMenu(parent, attributes, eventHandlers);
        case 'Submenu':
          return new UISubmenu(parent, config.text, attributes, eventHandlers);
        case 'MenuItem':
          return new UIMenuItem(parent, config.text, attributes, eventHandlers);
        case 'Button':
          return new UIButton(parent, config.text, attributes, eventHandlers);
        case 'Label':
          return new UILabel(parent, config.text, attributes, eventHandlers);
        case 'Input':
          return new UIInput(parent, attributes, eventHandlers);
        case 'Separator':
          return new UISeparator(parent, attributes, eventHandlers);
        default:
          throw new Error(`Unknown UI element type: ${type}`);
      }
    }
  }