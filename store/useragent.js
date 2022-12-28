export const isMobile = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (
        ua.match(
            /ip(hone|od)|android|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|tizen.+mobile|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/
        )
    ) {
        return true;
    } else {
        return false;
    }
};
