import pymysql

pymysql.install_as_MySQLdb()

# Force PyMySQL to report a newer server version to Django
# This tricks Django into bypassing the 10.6 version check
pymysql.version_info = (10, 6, 0, "maria", "caps")
