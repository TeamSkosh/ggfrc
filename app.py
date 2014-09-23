from flask import Flask, render_template

app = Flask('GGFRC')
app.config['DEBUG'] = True

@app.route("/")
def home():
    return render_template("home.html")


if __name__ == '__main__':
    app.run()
