function visibleHeight() {
    if (!document.getElementsByTagName('header').length ||
        !document.getElementsByTagName('footer').length) {
        return 0;
    }
    let header_height = document.getElementsByTagName('header')[0].clientHeight;
    let footer_height = document.getElementsByTagName('footer')[0].clientHeight;
    return window.innerHeight - header_height - footer_height;
}

export default visibleHeight;