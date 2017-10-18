import subprocess
import shutil
import os
import re

"""
    ***for python3***
"""

from_dir = "dist"
target_dir = "wandbox-angular-page"

from_repository = "https://github.com/happou31/wandbox-angular"
target_repository = "https://github.com/happou31/wandbox-angular-page"

gitlog_cp = subprocess.run(
    ["git", "log", "--pretty=oneline", "-1"], stdout=subprocess.PIPE)
git_log = gitlog_cp.stdout.decode("utf-8")

matcher = re.match("^([0-9,a-z]*) .*", git_log)
hashstr = ""
if matcher:
    hashstr = matcher.groups(1)
    print("find last commit hash(%s)" % hashstr)

if hashstr:
    if not os.path.exists("./%s" % from_dir):
        subprocess.run("npm run build")
    subprocess.run(["mv", "%s/*" % from_dir, "%s/" % target_dir])
    os.chdir(target_dir)
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", "update from %s/commit/%s" %
                    (from_repository, hashstr)])
    subprocess.run(["git", "push", "origin", "master"])

    os.chdir("../")
    print("pushed.")
    shutil.rmtree(from_dir)
    print("output dir removed.")
else:
    print("not found commits...")

print("All done.")
