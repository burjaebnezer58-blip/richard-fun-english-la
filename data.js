/* All sample content lives here. Edit or add items freely. */
const DATA = {
  daily: [
    { t: 'Greeting Circle', d: 'Greet three classmates with "Good morning, how are you?" and listen to the reply.' },
    { t: 'My Favourite Things', d: 'Say three things you like, starting each with "I like".' },
    { t: 'Describe a Picture', d: 'Look at any picture and describe it using five sentences.' },
    { t: 'Tongue Twister', d: 'Say "She sells sea shells" five times, getting faster each time.' },
    { t: 'Ask and Answer', d: 'Ask a partner three questions about their weekend.' },
    { t: 'Weather Report', d: 'Give a one-minute weather report for your town.' },
    { t: 'Yesterday I...', d: 'Tell a partner three things you did yesterday, using past tense.' },
    { t: 'Word of the Day', d: 'Use today\'s new word in three different sentences.' },
    { t: 'Phone a Friend', d: 'Pretend to call a friend and invite them to play. Use "Would you like to...?"' },
    { t: 'Shopping Talk', d: 'Practise asking the price of three items in a shop.' },
    { t: 'Family Tree', d: 'Introduce three family members in complete sentences.' },
    { t: 'Silent Mime', d: 'Act out an action. Your partner guesses it in one English sentence.' }
  ],
  gameTypes: [
    { n: 'Word Hunt', r: 'Hide word cards around the room. Teams find and read them aloud.' },
    { n: 'Memory Match', r: 'Pairs flip cards to match words with pictures.' },
    { n: 'Quiz Race', r: 'Two teams answer questions on the board. The fastest correct answer scores.' },
    { n: 'Odd One Out', r: 'Say which word does not belong in the group and why.' },
    { n: 'Charades', r: 'One student acts out a word. The class guesses in English.' },
    { n: 'Sentence Scramble', r: 'Teams rebuild jumbled sentences in the right order.' },
    { n: 'Bingo', r: 'Teacher calls words. The first full row wins.' },
    { n: 'Spelling Bee', r: 'Students spell words aloud in turns. A mistake means sitting out one round.' },
    { n: 'Story Chain', r: 'Each student adds one sentence to a class story.' },
    { n: 'Hot Seat', r: 'One student answers while the class asks follow-up questions.' }
  ],
  topics: ['Animals', 'Colours', 'Numbers', 'Family', 'Food', 'Verbs', 'Phonics', 'Opposites', 'Places', 'Feelings'],
  openers: ['', 'Every day, ', 'Today, ', 'At school, ', 'At home, ', 'Sometimes, ', 'On Sunday, ', 'After lunch, ', 'With a smile, ', 'Before bed, '],
  subjects: ['I', 'We', 'They', 'She', 'He', 'My sister', 'The teacher', 'My friends', 'Everyone', 'Our class'],
  third: ['She', 'He', 'My sister', 'The teacher', 'Everyone', 'Our class'],
  pairs: [['like', 'football'], ['read', 'books'], ['eat', 'pizza'], ['visit', 'the park'], ['listen to', 'music'], ['play', 'new games'], ['go to', 'school'], ['draw', 'pictures'], ['clean', 'the room'], ['speak', 'English']],
  phonics: [
    ['A', 'apple', 'ah'], ['B', 'ball', 'buh'], ['C', 'cat', 'kuh'], ['D', 'dog', 'duh'], ['E', 'egg', 'eh'],
    ['F', 'fish', 'fff'], ['G', 'goat', 'guh'], ['H', 'hat', 'huh'], ['I', 'igloo', 'ih'], ['J', 'jug', 'juh'],
    ['K', 'kite', 'kuh'], ['L', 'lion', 'lll'], ['M', 'moon', 'mmm'], ['N', 'nest', 'nnn'], ['O', 'orange', 'aw'],
    ['P', 'pig', 'puh'], ['Q', 'queen', 'kwuh'], ['R', 'rain', 'rrr'], ['S', 'sun', 'sss'], ['T', 'tiger', 'tuh'],
    ['U', 'umbrella', 'uh'], ['V', 'van', 'vvv'], ['W', 'water', 'wuh'], ['X', 'box', 'ks'], ['Y', 'yak', 'yuh'], ['Z', 'zebra', 'zzz']
  ],
  grammar: [
    { title: 'Present Simple', rule: 'Use for habits and facts. Add -s or -es for he, she and it.', qs: [
      { q: 'She ___ tea every morning.', o: ['drink', 'drinks', 'drinking'], a: 1 },
      { q: 'They ___ football on Sundays.', o: ['play', 'plays', 'playing'], a: 0 },
      { q: 'My brother ___ to school by bus.', o: ['go', 'goes', 'going'], a: 1 } ] },
    { title: 'Past Simple', rule: 'Use for finished actions. Regular verbs add -ed. Irregular verbs change form.', qs: [
      { q: 'I ___ my bag to school yesterday.', o: ['carry', 'carried', 'carries'], a: 1 },
      { q: 'We ___ to the park last week.', o: ['go', 'went', 'goes'], a: 1 },
      { q: 'She ___ a letter last night.', o: ['write', 'wrote', 'writes'], a: 1 } ] },
    { title: 'Articles', rule: 'Use "a" before consonant sounds, "an" before vowel sounds, and "the" for specific things.', qs: [
      { q: 'She has ___ umbrella.', o: ['a', 'an', 'the'], a: 1 },
      { q: '___ sun is very hot today.', o: ['A', 'An', 'The'], a: 2 },
      { q: 'He is ___ engineer.', o: ['a', 'an', 'the'], a: 1 } ] }
  ],
  vocab: [
    { w: 'cat', m: 'a small furry pet', e: 'The cat sleeps all day.' },
    { w: 'happy', m: 'feeling joy', e: 'I am happy to see you.' },
    { w: 'school', m: 'a place where we learn', e: 'We walk to school.' },
    { w: 'family', m: 'the people you live with', e: 'My family eats dinner together.' },
    { w: 'library', m: 'a place full of books', e: 'I borrow stories from the library.' },
    { w: 'breakfast', m: 'the first meal of the day', e: 'I eat eggs for breakfast.' },
    { w: 'weather', m: 'rain, sun or wind outside', e: 'The weather is sunny today.' },
    { w: 'journey', m: 'a trip from one place to another', e: 'Our journey took three hours.' },
    { w: 'curious', m: 'wanting to know more', e: 'The curious kitten explored the room.' },
    { w: 'environment', m: 'the natural world around us', e: 'We must protect the environment.' },
    { w: 'achieve', m: 'to succeed in reaching a goal', e: 'She will achieve her dream.' },
    { w: 'essential', m: 'very important', e: 'Water is essential for life.' }
  ],
  convo: [
    { q: 'How are you today?', a: 'I am fine, thank you. And you?' },
    { q: 'What is your favourite colour?', a: 'My favourite colour is blue because it reminds me of the sea.' },
    { q: 'What did you do last weekend?', a: 'I visited my grandmother and we cooked lunch together.' },
    { q: 'Can you help me with my homework?', a: 'Of course! Which question do you need help with?' },
    { q: 'What time do you usually wake up?', a: 'I usually wake up at six thirty in the morning.' },
    { q: 'Do you have any pets?', a: 'Yes, I have a dog named Max. He is very friendly.' }
  ],
  roles: [
    { t: 'At the Shop', r: ['Customer', 'Shopkeeper'], l: [
      ['Shopkeeper', 'Good morning! What can I get for you?'],
      ['Customer', 'Hello. I would like two apples, please.'],
      ['Shopkeeper', 'Anything else?'],
      ['Customer', 'No, thank you. How much is it?'],
      ['Shopkeeper', 'That is five dollars.'] ] },
    { t: 'Asking for Directions', r: ['Visitor', 'Local'], l: [
      ['Visitor', 'Excuse me, where is the library?'],
      ['Local', 'Go straight and turn left at the bank.'],
      ['Visitor', 'Thank you! Is it far?'],
      ['Local', 'No, it is five minutes on foot.'] ] },
    { t: 'Meeting a New Friend', r: ['Student A', 'Student B'], l: [
      ['Student A', 'Hi, my name is Sam. What is your name?'],
      ['Student B', 'Hello Sam, I am Lina. Nice to meet you!'],
      ['Student A', 'Nice to meet you too. Do you like football?'],
      ['Student B', 'Yes, I play every Saturday.'] ] }
  ],
  weekly: [
    { t: 'Describe Your Day', k: 'Speak for one minute about what you did today.' },
    { t: 'Favourite Food Talk', k: 'Tell a partner three reasons you like your favourite food.' },
    { t: 'Story Time', k: 'Tell a short story that starts with "Once upon a time".' },
    { t: 'News Reporter', k: 'Report one school event to the class in three sentences.' }
  ]
};
