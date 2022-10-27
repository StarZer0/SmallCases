const {stringify, parse} = require('./JSON')

test("circular self", () => {
    const root = {
        name: 'root'
    }
    root.value = root;
    
    expect(parse(stringify(root)).name).toBe('root')
});
