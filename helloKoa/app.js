( async () => {
    const res = fetch('http://localhost:7070')
    console.log(res);
    const result = await res;
    console.log(result);
})();