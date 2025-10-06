from browser import document

def calculate(event):
    event.preventDefault()
    document["output"].text = "Hello, World!"

document["js-form"].bind("submit", calculate)