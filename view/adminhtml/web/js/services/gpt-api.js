/**
 *
 * @author      Webjump Core Team <dev@webjump.com.br>
 * @copyright   2023 Webjump (http://www.webjump.com.br)
 * @license     http://www.webjump.com.br Copyright
 * @link        http://www.webjump.com.br
 *
 */

define([
        'jquery',
    ],
    function($) {

        return {



            postMessage: function (message) {

                const fetchConfig = {
                    method: 'POST',
                    headers: ["Content-Type: application/json", "Authorization: Bearer $OPENAI_API_KEY"],
                    body: {
                        "model": "gpt-3.5-turbo",
                        "messages": [{"role": "user", "content": message}]
                    }
                };

                fetch('https://api.openai.com/v1/chat/completions', fetchConfig).then(res=> console.log(res))
            }
        }


    });
