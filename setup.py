from setuptools import setup

setup(
    name="ggfrc",
    url="https://github.com/TeamSkosh/ggfrc",
    license="Apache 2.0",
    author="Skosh Interactive L.L.C",
    author_email="info@skoshinteractive.com",
    description="A tool to manage robotics clubs.",
    packages=[
        'ggfrc',
        'ggfrc.scripts',
    ],
    install_requires=[
        'flask==0.10.1',
        'flask-script==0.6.7',
    ],
    entry_points={
        'console_scripts': [
            'ggfrc=ggfrc.scripts.application:command'
        ]
    }
)
