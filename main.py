from flask import Flask, render_template
from blueprints import blueprints


def start():
  app = Flask("app")

  if app == None: return

  app.register_blueprint(blueprints)

  app.run(debug=True, host="0.0.0.0", port=5000)


if __name__ == "__main__":
  start()
