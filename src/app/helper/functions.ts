
const domainNameResolver = (domain: string) => {
    if (domain === "localhost") {
        // return "http://localhost:3000";
        return "https://dev.alphaomegainfosys.com/test-api"
    } else {
        return `https://${domain}/test-api`;
    }
}

export {domainNameResolver};
