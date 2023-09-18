from website import create_app

def start():
    app = create_app()

    if app == None:
        return

    app.run(debug=True, host="0.0.0.0", port=8080)


if __name__ == "__main__":
    start()