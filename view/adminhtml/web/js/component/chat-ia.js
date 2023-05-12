/**
 *
 * @author      Webjump Core Team <dev@webjump.com.br>
 * @copyright   2023 Webjump (http://www.webjump.com.br)
 * @license     http://www.webjump.com.br Copyright
 * @link        http://www.webjump.com.br
 *
 */

define([
        'uiComponent',
        'jquery',
        'ko',
    ],
    function(Component, $, ko ) {

        return Component.extend({
            defaults: {
                template: 'Webjump_ChatIA/chat-template',
                chatIsOpen: ko.observable(false)
            },

            initialize: function () {
                this._super();
                self = this;

            },

            closeChat: function () {
                self.chatIsOpen(false)
            },

            openChat: function () {
                self.chatIsOpen(true)
            },

            postMessage: function (message) {
                let bodyMessage = {
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": message}]
                }
                const fetchConfig = {
                    method: 'POST',
                    headers: {"Content-Type": "application/json", "Authorization": "Bearer ..."},
                    body: JSON.stringify(bodyMessage)
                };
                setTimeout(() => {
                    self.createWrittingAnimation()
                },500)

                fetch('https://api.openai.com/v1/chat/completions', fetchConfig).then(res=> res.json()).then(res => {
                    let newMessageWrapper = $("<div class='message-wrapper'></div>")
                    let newAssistMessage = $("<p class='message-assist'></p>").text(res.choices[0].message.content);
                    let newMessageName = $("<p class='message-name'></p>").text('assistant send');
                    let newMessageDate = $("<p class='message-date'></p>").text(self.dateGetter());
                    newMessageWrapper.addClass('assistant')
                    newMessageWrapper.append(newMessageName)
                    newMessageWrapper.append(newAssistMessage)
                    newMessageWrapper.append(newMessageDate)
                    $('.messages-board').append(newMessageWrapper)
                    $('.writting-animaiton-wrapper').remove()
                })
            },

            sendChatMenssage: function () {
                let message = $('#message-writing').val();
                let newMessageWrapper = $("<div class='message-wrapper'></div>")
                let newMessage = $("<p class='message-user'></p>").text(message);
                let newMessageName = $("<p class='message-name'></p>").text('user send');
                let newMessageDate = $("<p class='message-date'></p>").text(self.dateGetter());
                newMessageWrapper.addClass('user')
                newMessageWrapper.append(newMessageName)
                newMessageWrapper.append(newMessage)
                newMessageWrapper.append(newMessageDate)
                $('#message-writing').val('')
                $('.messages-board').append(newMessageWrapper)
                self.postMessage(message)
            },

            dateGetter: function (){
                let date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                let hours = date_ob.getHours();
                let minutes = date_ob.getMinutes();
                // let seconds = date_ob.getSeconds();
                return (date + "/" + month + "/" + year + " " + hours + ":" + minutes);
            },

            createWrittingAnimation: function (){
                let writtingAnimationWrapper = $("<div class='writting-animaiton-wrapper'></div>")
                let dot1 = ("<div class='dot'></div>")
                let dot2 = ("<div class='dot'></div>")
                let dot3 = ("<div class='dot'></div>")
                let newMessageName = $("<p class='message-name'></p>").text('writting');
                writtingAnimationWrapper.addClass('assistant')
                writtingAnimationWrapper.append(newMessageName)
                writtingAnimationWrapper.append(dot1)
                writtingAnimationWrapper.append(dot2)
                writtingAnimationWrapper.append(dot3)
                $('.messages-board').append(writtingAnimationWrapper)
            }
        })
    }
)
