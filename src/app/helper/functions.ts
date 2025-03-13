
const domainNameResolver = (domain: string) => {
    if (domain === "localhost") {
        return "http://localhost:3000";
    } else {
        return `https://${domain}`;
    }
}

export {domainNameResolver};
