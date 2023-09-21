from flask import Flask, render_template


def start():
  app = Flask("app")

  if app == None: return

  @app.route("/")
  def main():
    return render_template("main.html")

  @app.route("/downloads")
  def downloads():
    return render_template("downloads.html")

  @app.route("/about")
  def about():
    return render_template("about.html")

  app.run(host="0.0.0.0", port=5000)


if __name__ == "__main__":
  start()
