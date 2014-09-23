from ggfrc import app, render_template

@app.route("/")
def home():
    return render_template("home.html")
