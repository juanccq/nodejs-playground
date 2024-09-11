function sanitize( strings, ...values ) {
    console.log('params',strings, 'values', values);
    
    return strings.reduce((result, string, i) => {
        console.log('result->',result, 'string->', string, 'i->', i);
        
        let value = values[i -1 ];
        console.log('value->', value);
        
        if( typeof value == 'string') {
            value = value.replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#39;')
        }

        return result + value + string;
    });
}

const userInput = '<script>alert("xss")</script>';
const message = sanitize`User input: ${userInput}`;
console.log('message sanitized->', message);
