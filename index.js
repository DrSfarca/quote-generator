const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter-button')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}

function newQuote() {
  loading()
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]

  authorText.textContent = !quote.author ? 'Anonymous' : quote.author

  quoteText.textContent = quote.text

  quote.text.length > 50
    ? quoteText.classList.add('long-quote')
    : quoteText.classList.remove('long-quote')

  complete()
}

async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const res = await fetch(apiUrl)
    apiQuotes = await res.json()
    newQuote()
  } catch (error) {}
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()
