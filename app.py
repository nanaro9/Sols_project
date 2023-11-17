from flask import Flask, render_template
from flask_cors import CORS

app = Flask(__name__)
app.config["JSON_AS_ASCII"]=False
CORS(app)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/alfabets")
def abc():
    return render_template('alfabets.html')

@app.route("/speles")
def games():
    return render_template('speles.html')

@app.route("/video")
def video():
    return render_template('video.html')

@app.route("/par")
def about():
    return render_template('par.html')

@app.route("/atminasSpele")
def memoru():
    return render_template('atminasSpele.html')

@app.route("/miniVardu")
def word():
    return render_template('miniVardu.html')

@app.route("/.well-known/discord")
def discord():
    return render_template('.well-known/discord.html')



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=81)