export const commonStyles = (element) => {
    element.style.fontFamily = 'Roboto, sans-serif';
    element.style.fontSize = '14px';
    element.style.marginLeft = 'auto';
    element.style.marginRight = 'auto';
    element.style.textAlign = 'center';
    element.style.whiteSpace = "nowrap";
};

export const menuStyles = (element) => {
    element.style.position = "absolute";
    element.style.listStyleType = "none";
    element.style.padding = "0.4em";
    element.style.backgroundColor = "#f0f0f0";
    element.style.top = "5%";
    element.style.left = "2%";
    element.style.border = "1px solid #d0d0d0";
    element.style.borderRadius = "5px";
    element.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    element.style.width = "auto";
    element.style.height = "auto";
};

export const submenuStyles = (element) => {
    element.style.position = "relative";
    element.style.whiteSpace = "nowrap";
    element.style.padding = "0.10em 0.90em";
    element.style.cursor = "pointer";
};

export const menuItemStyles = (element) => {
    element.style.padding = "0.10em 0.90em";
    element.style.cursor = "pointer";
    element.style.width = "100%";
};

export const buttonStyles = (element) => {
    element.style.display = "block";
    element.style.width = "100%";
    element.style.padding = "0.3em";
    element.style.border = "1px solid #ccc";
    element.style.borderRadius = "4px";
    element.style.color = "#333";
};

export const labelStyles = (element) => {
    element.style.color = "#333";
};

export const inputStyles = (element) => {
    element.style.display = "block";
    element.style.width = "100%";
    element.style.padding = "0.3em 0.01em";
    element.style.border = "1px solid #ccc";
    element.style.borderRadius = "4px";
    element.style.color = "#333";
};

export const separatorStyles = (element) => {
    element.style.border = "none";
    element.style.borderTop = "1px solid #d0d0d0";
    element.style.margin = "0.2em 0";
};

export const dropdownMenuStyles = (element) => {
    element.style.position = "absolute";
    element.style.listStyleType = "none";
    element.style.padding = "0.4em";
    element.style.backgroundColor = "#f0f0f0";
    element.style.border = "1px solid #d0d0d0";
    element.style.borderRadius = "5px";
};

export const tabsStyles = (element) => {
    element.style.display = "flex";
    element.style.padding = "0.3em";
    element.style.border = "1px solid #ccc";
    element.style.borderRadius = "4px";
    element.style.color = "#333";
    element.style.cursor = "pointer";
}
