import Validate from "./Validate";

const Scroll = {

    getSpaceBottom(heightKeyBoard) {
        heightKeyBoard = parseFloat(heightKeyBoard);
        return window.outerHeight * heightKeyBoard;
    },

    executeScroll(myRef, heightKeyBoard) {
        if (Validate.getMobileOperatingSystem() === "iOS" || !myRef || myRef.current === null) {
            return null
        }
        let distanceScroll = window.outerHeight - heightKeyBoard;
        let scrollTo = (myRef.current.getBoundingClientRect().top - ((distanceScroll - myRef.current.clientHeight) / 2));

        try {
            window.scrollBy({ left: 0, top: scrollTo, behavior: 'smooth' });
        } catch (e) {
            window.scrollBy(0, scrollTo);
        }

    },

    scrollToTop() {
        try {
            window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        } catch (e) {
            window.scrollTo(0, 0);
        }

    }
};

export default Scroll;
