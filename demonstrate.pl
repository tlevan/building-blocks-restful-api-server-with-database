#!/usr/bin/perl -w

use strict;

my $i    = 1;
my $line = "";
my $id   = "";

print $i++ . "  READ (all)\n";
open COMMAND, "curl --silent http://localhost:65535/api/all |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

print $i++ . "  CREATE\n";
open COMMAND, "curl --silent --header \"Content-Type: application/json\" --data '{\"value\":\"sample value 1\"}' http://localhost:65535/api |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

$line =~ m/_id\":\"([0-9a-f]+)/i;
$id = $1;
print "-----------------------------------------------------\n";
print "|  _id of new document is $id  |\n";
print "-----------------------------------------------------\n\n";

print $i++ . "  READ (all)\n";
open COMMAND, "curl --silent http://localhost:65535/api/all |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

print $i++ . "  READ (one)\n";
open COMMAND, "curl --silent http://localhost:65535/api/$id |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

print $i++ . "  UPDATE\n";
open COMMAND, "curl --silent --request PUT --header \"Content-Type: application/json\" --data '{\"value\":\"sample value 2\"}' http://localhost:65535/api/$id |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

print $i++ . "  READ (one)\n";
open COMMAND, "curl --silent http://localhost:65535/api/$id |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

print $i++ . "  DELETE\n";
open COMMAND, "curl --silent --request DELETE http://localhost:65535/api/$id |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

print $i++ . "  READ (all)\n";
open COMMAND, "curl --silent http://localhost:65535/api/all |";
$line = <COMMAND>;
close COMMAND;
chomp($line);
print "$line\n\n";

