from flask import Blueprint, render_template

blueprints = Blueprint("blueprints", __name__)


@blueprints.route("/")
def main():
    return render_template("main.html")

@blueprints.route("/downloads")
def downloads():
    return render_template("downloads.html")

@blueprints.route("/about")
def about():
    return render_template("about.html")